const Benefits = require('./../database/schemas/BenefitSchema');
const serializer = require('./../utils/serializer');


const getBenefits = async (req, res, next) => {
    try {
        Benefits.find()
            .then(response => {
                res.status(200).json(serializer(200, { benefits: response }));
            })
            .catch(error => {
                throw new (error)
            });
    } catch (error) {
        console.log(error)
        res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddBenefit = async (req, res, next) => {
    const { title, imgUrl } = req.body;
    if (!title || !imgUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Image shouldn't be empty!" }));
    } else {
        try {
            const benefit = new Benefits({ title, imgUrl });
            benefit.save()
                .then(response => {
                    return res.status(201).json(serializer(response))
                })
                .catch(error => {
                    throw new (error)
                });
        } catch (error) {
            console.log(error)
            res.status(500).json(error, { message: "Something Went Wrong" });
        };
    };
};

const UpdateBenefit = async (req, res, next) => {
    const { id } = req.params;
    const { title, imgUrl } = req.body;
    if (!title || !imgUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Image  shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            Benefits.findById(id)
                .then(b => {
                    b.title = title;
                    b.imgUrl = imgUrl;

                    return b.save()
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'Benefit was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Benefit with id=${id}. Benefit was not found!` }));
                    };
                })
                .catch(error => {
                    throw new (error)
                });
        } catch (error) {
            console.log(error)
            res.status(500).json(error, { message: "Something Went Wrong" });
        };
    } else {
        next();
    };
};

const DeleteBenefit = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            Benefits.findOneAndRemove(id)
                .then(response => {
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'Benefit was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Benefit with id=${id}. Benefit was not found!` }));
                    };
                })
                .catch(error => {
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error)
            res.status(500).json(error, { message: "Could not delete Benefit with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { getBenefits, AddBenefit, DeleteBenefit, UpdateBenefit }