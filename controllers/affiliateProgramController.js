const models = require('./../database/models');
const serializer = require('./../utils/serializer');


const getAffiliatePrograms = async (req, res, next) => {
    try {
        return await models.AffiliateProgram.findAll()
            .then(response => {
                res.status(200).json(serializer(200, { data: response }));
            })
            .catch(error => {
                throw new (error)
            });
    } catch (error) {
        console.log(error)
        res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddAffiliateProgram = async (req, res, next) => {
    const { title, description, imageUrl } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else {
        try {
            return await models.AffiliateProgram.create({ title, description, imageUrl })
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

const UpdateAffiliateProgram = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id > 0 && !isNaN(id)) {
        try {
            return await models.AffiliateProgram.update({ title, description, imageUrl }, { where: { id } })
                .then(response => {
                    if (response == 1) {
                        res.status(201).json(serializer(201, { message: 'AffiliateProgram was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update AffiliateProgram with id=${id}. AffiliateProgram was not found!` }));
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

const DeleteAffiliateProgram = async (req, res, next) => {
    const { id } = req.params;
    if (id > 0 && !isNaN(id)) {
        try {
            return await models.AffiliateProgram.destroy({ where: { id: id } })
                .then(response => {
                    if (response == 1) {
                        res.status(202).json(serializer(202, { message: 'AffiliateProgram was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete AffiliateProgram with id=${id}. AffiliateProgram was not found!` }));
                    };
                })
                .catch(error => {
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error)
            res.status(500).json(error, { message: "Could not delete AffiliateProgram with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { getAffiliatePrograms, AddAffiliateProgram, DeleteAffiliateProgram, UpdateAffiliateProgram }