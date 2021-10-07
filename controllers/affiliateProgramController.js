const AffiliateProgram = require('./../database/schemas/AffiliateProgramSchema');
const serializer = require('./../utils/serializer');


const getAffiliatePrograms = async (req, res, next) => {
    try {
        AffiliateProgram.find()
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
    const { title, description, imgUrl } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else {
        try {
            const affiliateProgram = new AffiliateProgram({ title, description, imgUrl });
            affiliateProgram.save()
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
    const { title, description, imgUrl } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            AffiliateProgram.findById(id)
                .then(ap => {
                    ap.title = title;
                    ap.description = description;
                    ap.imgUrl = imgUrl;

                    return ap.save();

                })
                .then(response => {
                    if (response) {
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
    if (id !== '') {
        try {
            AffiliateProgram.findByIdAndRemove(id)
                .then(response => {
                    if (response) {
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