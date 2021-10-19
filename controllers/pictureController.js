const Picture = require('../database/schemas/PictureSchema');
const serializer = require('../utils/serializer');

const UpdatePicture = async (req, res, next) => {
    const { id } = req.params;
    const { imgUrl } = req.body;

    if (!imgUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Image Url shouldn't be empty" }));
    } else if (id !== "") {
        try {
            Picture.findById(id).then(p => {
                p.imgUrl = imgUrl;
                return p.save()
            })
                .catch(e => {
                    console.log(e)
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'Picture was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Picture with id=${id}. Picture was not found!` }));
                    };
                })
                .catch(e => {
                    next(e);
                });
        } catch (e) {
            res.status(500).json(error, { error: e, message: "Something Went Wrong", });
        };
    };
};

const DeletePicture = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            Picture.findByIdAndRemove(id)
                .then(response => {
                    console.log('==========>', response)
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'Picture was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Picture with id=${id}. Benefit was not found!` }));
                    };
                })
                .catch(e => {
                    next(e);
                    
                });
        } catch (e) {
            console.log(e);
            res.status(500).json(error, { message: "Could not delete Benefit with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = {UpdatePicture, DeletePicture}