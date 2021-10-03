const models = require('./../database/models');
const serializer = require('./../utils/serializer');

const getFaqs = async (req, res, next) => {
    try {
        return await models.Faqs.findAll()
            .then(response => {
                return res.status(200).json(serializer(200, { faqs: response }));
            })
            .catch(error => {
                throw new Error(error);
            });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddFaq = async (req, res, next) => {
    console.log(req.body)
    const { title, description, langKey = 'en' } = req.body;
    if (!title || !description) {
        return res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else {
        try {
            return await models.sequelize.query('select * from dbo.Faqs ORDER BY itemKey DESC').then(maxValue => {
                let maxId = maxValue[0][maxValue[0].length - 1]?.itemKey;
                
                !maxId? 1 : maxId += 1;
                return models.Faqs.create({ title, description, itemKey: maxId, langKey })
                    .then(response => {
                        return res.status(201).json(serializer(201, response))
                    })
                    .catch(error => {
                        throw new Error(error);
                    });
            })


        } catch (error) {
            return res.status(500).json(error, { message: "Something Went Wrong" });
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
            return await models.Faqs.update({ title, description }, { where: { id } })
                .then(response => {
                    if (response == 1) {
                        return res.status(201).json(serializer(201, { message: 'FAQ was updated successfully!' }));
                    } else {
                        return res.status(200).json(serializer(200, null, false, { message: `Cannot update FAQ with id=${id}. FAQ was not found!` }));
                    };
                }).cathc(error => {
                    throw new Error(error);
                });
        } catch (error) {
            return res.status(500).json(error, { message: "Could not delete Tutorial with id=" + id });
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
            return await models.Faqs.destroy({ where: { id: id } })
                .then(response => {
                    if (response == 1) {
                        return res.status(202).json(serializer(202, { message: 'FAQ was deleted successfully!' }));
                    } else {
                        console.log(response)
                        return res.status(200).json(serializer(200, null, false, { message: `Cannot delete FAQ with id=${id}. FAQ was not found!` }));
                    };
                })
                .catch(error => {
                    throw new Error(error);
                });
        } catch (error) {
            return res.status(500).json(error, { message: "Could not delete Tutorial with id=" + id });
        };
    } else {
        next();
    };
};



module.exports = { getFaqs, AddFaq, DeleteFaq, UpdateFaq }