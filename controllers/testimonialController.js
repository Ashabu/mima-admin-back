
const models = require('./../database/models');
const serializer = require('./../utils/serializer');


const getTestimonials = async (req, res, next) => {
    try {
        return await models.Testimonial.findAll()
            .then(response => {
                res.status(200).json(serializer(200, { testimonials: response }));
            })
            .catch(error => {
                throw new (error)
            });
    } catch (error) {
        console.log(error)
        res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddTestimonial = async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else {
        try {
            return await models.Testimonial.create({ title, description })
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

const UpdateTestimonial = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id > 0 && !isNaN(id)) {
        try {
            return await models.Testimonial.update({ title, description }, { where: { id } })
                .then(response => {
                    if (response == 1) {
                        res.status(201).json(serializer(201, { message: 'Testimonial was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Testimonial with id=${id}. Testimonial was not found!` }));
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

const DeleteTestimonial = async (req, res, next) => {
    const { id } = req.params;
    if (id > 0 && !isNaN(id)) {
        try {
            return await models.Testimonial.destroy({ where: { id: id } })
                .then(response => {
                    if (response == 1) {
                        res.status(202).json(serializer(202, { message: 'Testimonial was deleted successfully!' }));
                    } else {
                        console.log(response)
                        res.send(200).json(serializer(200, {}, false, { message: `Cannot delete Testimonial with id=${id}. Testimonial was not found!` }));
                    };
                })
                .catch(error => {
                    throw new error(error);
                });
        } catch (error) {
            console.log(error)
            res.status(500).json(error, { message: "Could not delete Testimonial with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { getTestimonials, AddTestimonial, DeleteTestimonial, UpdateTestimonial }