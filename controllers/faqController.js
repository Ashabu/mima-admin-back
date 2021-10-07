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
                throw new Error(error);
            });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddFaq = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else {
        try {
            const faq = new Faq({ title, description });
            faq.save()
                .then(response => {
                    return res.status(201).json(serializer(201, response))
                })
                .catch(error => {
                    throw new Error(error);
                });
        } catch (error) {
            return res.status(500).json(error, { message: "Something Went Wrong" });
        };
    };
};


// need to change
const UpdateFaq = async (req, res, next) => {
    const id = req.params.id;
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id !== '' ) {
        try {
           
            Faq.findById(id)
                .then(faq => {
                     console.log('id', id, 'faq', faq)       
                    faq.title = title;
                    faq.description = description;
                    return faq.save();
                })
                .then(response => {
                    if (response) {
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


// need to change
const DeleteFaq = async (req, res, next) => {
    console.log('params.id----->', req.params.id)
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