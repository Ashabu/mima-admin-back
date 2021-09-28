const models = require('./../database/models');
const serializer = require('./../utils/serializer');


const getFaqs = async (req, res, next) => {
    try {
        return await models.Faq.findAll()
            .then(response => {
                res.status(200).json(serializer(200, { faqs: response }));
            })
            .catch(error => {
                throw new error(error);
            });;
    } catch (error) {
        console.log(error)
        res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddFaq = async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else {
        try {
            return await models.Faq.create({ title, description })
                .then(response => {
                    return res.status(201).json(serializer(201, response))
                })
                .catch(error => {
                    throw new error(error);
                });
        } catch (error) {
            res.status(500).json(error, { message: "Something Went Wrong" });
        };
    };
};

const UpdateFaq = async (req, res, next) => {
    const id = req.params.id;
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id > 0 && !isNaN(id)) {
        try {
            return await models.Faq.update({ title, description }, { where: { id } })
                .then(response => {
                    if (response == 1) {
                        res.status(201).json(serializer(201, { message: 'FAQ was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update FAQ with id=${id}. FAQ was not found!` }));
                    };
                }).cathc(error => {
                    throw new error(error);
                });
        } catch (error) {
            res.status(500).json(error, { message: "Could not delete Tutorial with id=" + id });
        };
    } else {
        next();
    };
};

const DeleteFaq = async (req, res, next) => {
    console.log('params.id----->', req.params.id)
    const id = req.params.id;
    if (id > 0 && !isNaN(id)) {
        try {
            return await models.Faq.destroy({ where: { id: id } })
                .then(response => {
                    if (response == 1) {
                        res.status(202).json(serializer(202, { message: 'FAQ was deleted successfully!' }));
                    } else {
                        console.log(response)
                        res.send(200).json(serializer(200, {}, false, { message: `Cannot delete FAQ with id=${id}. FAQ was not found!` }));
                    };
                })
                .catch(error => {
                    throw new error(error);
                });
        } catch (error) {
            res.status(500).json(error, { message: "Could not delete Tutorial with id=" + id });
        };
    } else {
        next();
    };
};



module.exports = { getFaqs, AddFaq, DeleteFaq, UpdateFaq }