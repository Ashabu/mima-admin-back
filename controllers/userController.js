const User = require('./../database/schemas/UserSchema');
const serializer = require('./../utils/serializer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../.env');



const getUsers = async (req, res) => {
    try {
        User.find()
            .then(response => {
                return res.status(200).json(serializer(200, { users: response }));
            })
            .catch(error => {
                next();
                throw new Error(error);
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const singUp = async (req, res, next) => {
    const { userName, password, name, surname } = req.body;
    try {
        User.findOne({ userName: userName })
            .then(user => {
                if (user) {
                    return res.status(200).json(serializer(200, null, false, { message: "User allready exists...." }));
                }
            })
            .catch(err => {
                console.log(err);
                next();
            });
        if (!userName || !password || !name || !surname) {
            return res.status(200).json(serializer(200, null, false, { message: "Fields shouldn't be empty!" }));
        } else {
            let hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                userName: userName,
                password: hashedPassword,
                name: name,
                surname: surname
            });
            user.save()
                .then(response => {
                    console.log('create user', response);
                    next();
                })
                .catch(error => {
                    next();
                    throw new Error(error);
                });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const signIn = async (req, res) => {
    let loadedUser;
    const { userName, password } = req.body;

    try {
        User.findOne({ userName: userName })
            .then(user => {
                if (!user) {
                    return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));
                };
                loadedUser = user;
                return bcrypt.compare(password, loadedUser.password)
                    .then(isEqual => {
                        if (!isEqual) {
                            console.log(loadedUser, user, isEqual)
                            return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));
                        };
                        const secretKey = process.env.SECRET_KEY;
                        const token = jwt.sign(
                            {
                                id: loadedUser._id.toString(),
                                name: loadedUser.name,
                                surname: loadedUser.surname,
                                userName: loadedUser.userName
                            },
                            secretKey,
                            {
                                expiresIn: '1h'
                            }
                        );
                        return res.status(200).json({ token: token, id: loadedUser._id.toString() })
                    });
            })
            .catch(err => {
                next();
                throw new Error(err);
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error, { message: "Something Went Wrong" });
    }

}

const updateUser = async (req, res, next) => {
    const id = req.params.id
    const { userName, oldPassword, newPassword } = req.body;
    try {
        User.findOne({ userName: userName })
        .then(user => {
            if (!user) {
                return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));
            };
        })
        .catch(err => {
            console.log(err);
            next();
        });
        
        
        let newHashedpassword =  await bcrypt.hash(newPassword, 10);

        User.findByIdAndUpdate({userName: userName}, {password: newHashedpassword}, (err, res) => {
            if(err) {
                console.log(err);
                next();
            } else {
                return res.status(202).json(serializer(202, { message: 'User was Updated successfully!' }));
            }
        }).catch(err => {
            next();
            throw new Error(err)
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error, { message: "Something Went Wrong" });
    }

}

const deleteUser = async (req, res) => {
    const { userName, password, id } = req.body;
    let loadedUser;
    try {
        User.findOne({ userName: userName })
            .then(user => {
                if (!user) {
                    return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));
                };
                loadedUser = user;
                return bcrypt.compare(password, loadedUser.password)
                    .then(isEqual => {
                        if (!isEqual) {
                            console.log(loadedUser, user, isEqual)
                            return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));
                        };
                        User.findOneAndDelete(id)
                            .then(response => {
                                if (response) {
                                    return res.status(202).json(serializer(202, { message: 'User was deleted successfully!' }));
                                } else {
                                    console.log(response)
                                    return res.status(200).json(serializer(200, null, false, { message: `Cannot delete User with id=${id}. User was not found!` }));
                                };
                            })
                            .catch(error => {
                                next();
                                throw new Error(error);
                            });
                    });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error, { message: "Something Went Wrong" });
    }
};


module.exports = { singUp, signIn, getUsers, updateUser, deleteUser }




