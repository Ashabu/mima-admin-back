const models = require('./../database/models');
const serializer = require('./../utils/serializer');


const getBenefits = async (req, res, next) => {
    try {
        return await models.Benefits.findAll()
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
    const { title, imageUrl } = req.body;
    if (!title || !imageUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Image shouldn't be empty!" }));
    } else {
        try {
            return await models.Benefits.create({ title, imageUrl })
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
    const { title, imageUrl } = req.body;
    if (!title || !imageUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Image  shouldn't be empty!" }));
    } else if (id > 0 && !isNaN(id)) {
        try {
            return await models.Benefits.update({ title, imageUrl }, { where: { id } })
                .then(response => {
                    if (response == 1) {
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
    if (id > 0 && !isNaN(id)) {
        try {
            return await models.Benefits.destroy({ where: { id: id } })
                .then(response => {
                    if (response == 1) {
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