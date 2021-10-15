
const Partner = require('../database/schemas/PartnerSchemas');
const serializer = require('./../utils/serializer');


const getPartners = async (req, res) => {
    try {
        Partner.find()
            .then(response => {
                res.status(200).json(serializer(200, { partners: response }));
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

const AddPartner = async (req, res) => {
    const { linkUrl, imgUrl } = req.body;
    if (!linkUrl || !imgUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Link or Image shouldn't be empty!" }));
    } else {
        try {
            const partner = new Partner({ 
                linkUrl: linkUrl, 
                imgUrl: imgUrl 
            });
            partner.save()
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

const UpdatePartner = async (req, res, next) => {
    const { id } = req.params;
    const {linkUrl, imgUrl } = req.body;
    if (!linkUrl || !imgUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Link or Image shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            Partner.findById(id)
                .then(p => {
                    p.linkUrl = linkUrl;
                    p.imgUrl = imgUrl;

                    return p.save();
                })
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'Partners was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Partners with id=${id}. Partners was not found!` }));
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

const DeletePartner = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            Partner.findByIdAndRemove(id)
                .then(response => {
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'Partners was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Partners with id=${id}. Partners was not found!` }));
                    };
                })
                .catch(error => {
                    next();
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error, { message: "Could not delete Partners with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { getPartners, AddPartner, DeletePartner, UpdatePartner }