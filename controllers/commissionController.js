const models = require('./../database/models');
const serializer = require('./../utils/serializer');


const getCommissions = async (req, res, next) => {
    try {
        return await models.Commissions.findAll()
            .then(response => {
                res.status(200).json(serializer(200, { commissions: response }));
            })
            .catch(error => {
                throw new (error)
            });
    } catch (error) {
        console.log(error)
        res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddCommission = async (req, res, next) => {
    const { title, description, revenue, imageUrl } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else {
        try {
            return await models.Commissions.create({ title, description,revenue,imageUrl })
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

const UpdateCommission = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, revenue, imageUrl } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id > 0 && !isNaN(id)) {
        try {
            return await models.Commissions.update({ title, description, revenue, imageUrl }, { where: { id } })
                .then(response => {
                    if (response == 1) {
                        res.status(201).json(serializer(201, { message: 'Commission was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Commission with id=${id}. Commission was not found!` }));
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

const DeleteCommission = async (req, res, next) => {
    const { id } = req.params;
    if (id > 0 && !isNaN(id)) {
        try {
            return await models.Commissions.destroy({ where: { id: id } })
                .then(response => {
                    if (response == 1) {
                        res.status(202).json(serializer(202, { message: 'Commission was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Commission with id=${id}. Commission was not found!` }));
                    };
                })
                .catch(error => {
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error)
            res.status(500).json(error, { message: "Could not delete Commission with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { getCommissions, AddCommission, DeleteCommission, UpdateCommission }