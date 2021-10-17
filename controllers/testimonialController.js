
const Testimonial = require('./../database/schemas/TestimonialSchema');
const serializer = require('./../utils/serializer');


const getTestimonials = async (req, res, next) => {
    try {
        Testimonial.find()
            .then(response => {
                res.status(200).json(serializer(200, { testimonials: response }));
            })
            .catch(error => {
                next();
                throw new Error(error)
            });
    } catch (error) {
        console.log(error);
        res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddTestimonial = async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
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
 
            const testimonial = new Testimonial({ 
                title: newTitle, 
                description: newDescription
            });

            testimonial.save()
                .then(response => {
                    return res.status(201).json(serializer(response))
                })
                .catch(error => {
                    next();
                    throw new Error(error);
                    
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error, { message: "Something Went Wrong" });
        };
    };
};

const UpdateTestimonial = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            Testimonial.findById(id)
                .then(t => {
                    t.title = title;
                    t.description = description;

                    return t.save()
                })
                .then(response => {
                    if (response == 1) {
                        res.status(201).json(serializer(201, { message: 'Testimonial was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Testimonial with id=${id}. Testimonial was not found!` }));
                    };
                })
                .catch(error => {
                    next();
                    throw new Error(error)
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error, { message: "Something Went Wrong" });
        };
    } else {
        next();
    };
};

const DeleteTestimonial = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            Testimonial.findByIdAndRemove(id)
                .then(response => {
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'Testimonial was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Testimonial with id=${id}. Testimonial was not found!` }));
                    };
                })
                .catch(error => {
                    next();
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error, { message: "Could not delete Testimonial with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { getTestimonials, AddTestimonial, DeleteTestimonial, UpdateTestimonial }