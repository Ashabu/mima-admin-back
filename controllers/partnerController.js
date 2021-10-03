
const models = require('./../database/models');
const serializer = require('./../utils/serializer');


const getPartners = async (req, res, next) => {
    try {
        return await models.Partners.findAll()
            .then(response => {
                res.status(200).json(serializer(200, { partnerss: response }));
            })
            .catch(error => {
                throw new (error)
            });
    } catch (error) {
        console.log(error)
        res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddPartner = async (req, res, next) => {
    const { name, linkUrl, imageUrl } = req.body;
    if (!linkUrl || !imageUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Link or Image shouldn't be empty!" }));
    } else {
        try {
            return await models.Partners.create({ name, linkUrl, imageUrl })
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

const UpdatePartner = async (req, res, next) => {
    const { id } = req.params;
    const { name, linkUrl, imageUrl } = req.body;
    if (!linkUrl || !imageUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Link or Image shouldn't be empty!" }));
    } else if (id > 0 && !isNaN(id)) {
        try {
            return await models.Partners.update({name, linkUrl, imageUrl }, { where: { id } })
                .then(response => {
                    if (response == 1) {
                        res.status(201).json(serializer(201, { message: 'Partners was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Partners with id=${id}. Partners was not found!` }));
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

const DeletePartner = async (req, res, next) => {
    const { id } = req.params;
    if (id > 0 && !isNaN(id)) {
        try {
            return await models.Partners.destroy({ where: { id: id } })
                .then(response => {
                    if (response == 1) {
                        res.status(202).json(serializer(202, { message: 'Partners was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Partners with id=${id}. Partners was not found!` }));
                    };
                })
                .catch(error => {
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error)
            res.status(500).json(error, { message: "Could not delete Partners with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { getPartners, AddPartner, DeletePartner, UpdatePartner }