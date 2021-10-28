const Image = require('../database/schemas/ImageSchema');
const serializer = require('../utils/serializer');

const AddImage = async (req, res, next) => {
    try {
        const { imgUrl, relatesTo } = req.body;
        const newImage = new Image({
            imgUrl: imgUrl,
            relatesTo: relatesTo,
        });
        newImage.save();
        res.status(201).json(serializer(201, newImage, true));
    } catch (err) {
        next(err);
    }
};

const UpdateImage = async (req, res, next) => {
    const { id } = req.params;
    const { imgUrl } = req.body;
    if (!imgUrl) {
        res.status(200).json(serializer(200, null, false, { message: "Image Url shouldn't be empty" }));
    } else if (id !== "") {
        try {
            Image.findById(id).then(img => {
                img.imgUrl = imgUrl;
                return img.save()
            })
                .catch(e => {
                    console.log(e)
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'Image was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Image with id=${id}. Image was not found!` }));
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

const DeleteImage = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            Image.findByIdAndRemove(id)
                .then(response => {
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'Image was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Image with id=${id}. Image was not found!` }));
                    };
                })
                .catch(e => {
                    next(e);
                });
        } catch (e) {
            console.log(e);
            res.status(500).json(error, { message: "Could not delete Image with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { AddImage, UpdateImage, DeleteImage }