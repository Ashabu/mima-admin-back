
const MarketingTool = require('./../database/schemas/MarketingToolSchema');
const Picture = require('./../database/schemas/PictureSchema');
const serializer = require('../utils/serializer');


const GetMarketingTools = async (req, res, next) => {
    try {
        MarketingTool.find()
            .then(response => {
                res.status(200).json(serializer(200, { tools: response }));
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

const AddMarketingTool = async (req, res, next) => {
    const { title, description, imgUrl } = req.body;
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

            const marketingTool = new MarketingTool({
                title: newTitle,
                description: newDescription,
                imgUrl: imgUrl
            });

            marketingTool.save()
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

const UpdateMarketingTool = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, imgUrl } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            MarketingTool.findById(id)
                .then(t => {
                    t.title = title;
                    t.description = description;
                    if (imgUrl) {
                        t.imgUrl = imgUrl
                    };

                    return t.save();
                })
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'MarketingTool was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update MarketingTool with id=${id}. MarketingTool was not found!` }));
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


const DeleteMarketingTool = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            MarketingTool.findByIdAndRemove(id)
                .then(response => {
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'MarketingTool was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete MarketingTool with id=${id}. MarketingTool was not found!` }));
                    };
                })
                .catch(error => {
                    next();
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error, { message: "Could not delete MarketingTool with id=" + id });
        };
    } else {
        next();
    };
};

const AddPicture = async (req, res, next) => {
    try {
        const { imgUrl, relatesTo } = req.body;
        const newPicture = new Picture({ imgUrl: imgUrl, relatesTo: relatesTo });
        newPicture.save();
        const marketingTool = await MarketingTool.findById({ _id: newPicture.relatesTo });
        marketingTool.images.push(newPicture)

        await marketingTool.save();
        res.status(201).json(serializer(201, newPicture, true));
    } catch (err) {
        next(err)
    }
};

const DeletePicture = async (req, res, next) => {
    const { id } = req.params;
    const { pictureId } = req.body;

    if (!pictureId) {
        res.status(200).json(serializer(200, null, false, { message: "Picture id shouldn't be empty" }));
    } else if (id !== "") {
        try {
            MarketingTool.findById(id).then(p => {
                let updatedImages = p.images.filter(img => img._id.toString() !== pictureId);
                p.images = updatedImages;
                return p.save()
            })
                .catch(e => {
                    console.log(e)
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'Picture was deleted successfully!' }, true));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot deleted Picture with id=${id}. Picture was not found!` }));
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


module.exports = { GetMarketingTools, AddMarketingTool, DeleteMarketingTool, UpdateMarketingTool, DeletePicture, AddPicture }