
const SkypeLink = require('../database/schemas/SkypeLinkSchema');
const serializer = require('./../utils/serializer');


const GetSkypeLinks = async (req, res) => {
    try {
        SkypeLink.find()
            .then(response => {
                res.status(200).json(serializer(200, { link: response }, true));
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

const AddSkypeLink = async (req, res) => {
    const { description } = req.body;
    if (!description ) {
        res.status(200).json(serializer(200, null, false, { message: "Link  shouldn't be empty!" }));
    } else {
        try {
            const skypeLink = new SkypeLink({ 
                description: description, 
            });
            skypeLink.save()
                .then(response => {
                    return res.status(201).json(serializer(response))
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
};

const UpdateSkypeLink = async (req, res, next) => {
    const { id } = req.params;
    const {linkUrl } = req.body;
    if (!linkUrl ) {
        res.status(200).json(serializer(200, null, false, { message: "Link shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            SkypeLink.findById(id)
                .then(p => {
                    p.description = linkUrl;
                    return p.save();
                })
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'Link was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Link with id=${id}. SkypeLinks was not found!` }));
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

const DeleteSkypeLink = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            SkypeLink.findByIdAndRemove(id)
                .then(response => {
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'Link was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Link with id=${id}. SkypeLinks was not found!` }));
                    };
                })
                .catch(error => {
                    next();
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error, { message: "Could not delete Link with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { GetSkypeLinks, AddSkypeLink, DeleteSkypeLink, UpdateSkypeLink }