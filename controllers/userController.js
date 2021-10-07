const models = require('./../database/models');
const serializer = require('./../utils/serializer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../.env');



const getUsers = async (req, res, next) => {
    try {
        return await models.Users.findAll()
            .then(response => {
                return res.status(200).json(serializer(200, { users: response }));
            })
            .catch(error => {
                throw new Error(error);
            });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error, { message: "Something Went Wrong" });
    };
};


const singUp = async (req, res, next) => {
    const { userName, password, name, surname } = req.body;
    try {
        let user = await models.Users.findOne({ where: { userName } });
        if (user) return res.status(200).json(serializer(200, null, false, { message: "User allready exists...." }));
        if (!userName || !password || !name || !surname) {
            return res.status(200).json(serializer(200, null, false, { message: "Fields shouldn't be empty!" }));
        } else {
            user = {
                userName,
                password,
                name,
                surname,
            }

            user.password = await bcrypt.hash(user.password, 10);
console.log(user.password.length)
            return await models.Users.create({ ...user })
                .then(res => {
                    console.log('create user', res);
                    next();
                })
                .catch(error => {
                    throw new Error(error)
                });
        };
    } catch (error) {
        console.log(error)
        return res.status(500).json(error, { message: "Something Went Wrong" });
    };

}

const signIn = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        let user =  JSON.parse(JSON.stringify(await models.Users.findOne({ where: { userName } }))) ;
      
        if (!user) return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));
        console.log('user ------>', user)
        let validPassword = await bcrypt.compare(password, user.password.trim());
        if(!validPassword) return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ id: user.userId, name: user.name, surname: user.surname, userName: user.userName }, secretKey);
        return res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error, { message: "Something Went Wrong" });
    }

}

const updateUser = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        let user =  JSON.parse(JSON.stringify(await models.Users.findOne({ where: { userName } }))) ;
      
        if (!user) return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));
        console.log('user ------>', user)
        let validPassword = await bcrypt.compare(password, user.password.trim());
        if(!validPassword) return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ id: user.userId, name: user.name, surname: user.surname, userName: user.userName }, secretKey);
        return res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error, { message: "Something Went Wrong" });
    }

}

const deleteUser = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        let user =  JSON.parse(JSON.stringify(await models.Users.findOne({ where: { userName } }))) ;
      
        if (!user) return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));
        console.log('user ------>', user)
        let validPassword = await bcrypt.compare(password, user.password.trim());
        if(!validPassword) return res.status(200).json(serializer(200, null, false, { message: "Invalid Username or Password..." }));

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ id: user.userId, name: user.name, surname: user.surname, userName: user.userName }, secretKey);
        return res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error, { message: "Something Went Wrong" });
    }

}


module.exports = { singUp, signIn, getUsers, updateUser , deleteUser }




