
const models = require('./../database/models');
const serializer = require('./../utils/serializer');


const getFaqs = async (req, res, next) => {
    try {
        return await models.Faq.findAll()
            .then(response => {
                console.log('response', response);
                res.status(200).json(serializer(200, {faqs: response}));
            });
    } catch (error) {
        console.log(error)
        res.send(error);
    };
};

const AddFaq = async (req, res, next) => {
    const { title, description } = req.body;
    try {
        return await models.Faq.create({ title, description })
            .then(response => {
                return res.status(201).json(serializer(response))
            });
    } catch (error) {
        res.send(error);
    };
};

const DeleteFaq = async (req, res, next) => {
    const { id } = req.params;
    if (id > 0) {
        try {
            return await models.Faq.destroy({ where: { id } })
                .then(response => {
                    res.status(202).json(serializer(202, response));
                });
        } catch (error) {
            res.send(error);
        };
    } else {
        next();
    };
};

const UpdateFaq = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (id > 0) {
        try {
            return await models.Faq.update({ title, description }, { where: { id } })
                .then(response => {
                    res.status(201).json(serializer(201, response));
                })
        } catch (error) {
            res.send(error);
        };
    } else {
        next();
    };
};

module.exports = { getFaqs, AddFaq, DeleteFaq, UpdateFaq }