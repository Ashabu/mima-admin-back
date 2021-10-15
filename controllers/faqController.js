const Faq = require('./../database/schemas/FaqSchema');
const serializer = require('./../utils/serializer');

const getFaqs = async (req, res, next) => {
    try {
        Faq.find()
            .then(response => {
                console.log(response)
                return res.status(200).json(serializer(200, { faqs: response }));
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

const AddFaq = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else {
        try {
            let newTitle = {
                en: title.en || title.ru,
                ru: title.ru || title.en,
            };

            let newDescription = {
                en: description.en || description.ru,
                ru: description.ru || description.en
            };

            const faq = new Faq({ 
                title: newTitle, 
                description: newDescription  
            });
            faq.save()
                .then(response => {
                    return res.status(201).json(serializer(201, response))
                })
                .catch(error => {
                    next();
                    throw new Error(error);
                });
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
    } else if (id !== '' ) {
        try {
           

            Faq.findById(id)
                .then(faq => {
                    faq.title = title;
                    faq.description = description;
                    return faq.save();
                })
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    console.log('response ====>', response)
                    if (response) {
                        return res.status(201).json(serializer(201, { message: 'FAQ was updated successfully!' }));
                    } else {
                        return res.status(200).json(serializer(200, null, false, { message: `Cannot update FAQ with id=${id}. FAQ was not found!` }));
                    };
                }).cathc(error => {
                    console.log(error);
                    next();
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
    const id = req.params.id;
    if (id !=='') {
        try {
           Faq.findByIdAndRemove(id)    
                .then(response => {
                    if (response) {
                        return res.status(202).json(serializer(202, { message: 'FAQ was deleted successfully!' }));
                    } else {
                        console.log(response)
                        return res.status(200).json(serializer(200, null, false, { message: `Cannot delete FAQ with id=${id}. FAQ was not found!` }));
                    };
                })
                .catch(error => {
                    next();
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