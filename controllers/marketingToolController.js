
const MarketingTool = require('./../database/schemas/MarketingToolSchema');
const Image = require('./../database/schemas/ImageSchema');
const serializer = require('../utils/serializer');


const GetMarketingTools = async (req, res, next) => {
    try {
        let image = await Image.find({ relatesTo: 'MarketingTool' });
        let images;
        if (image.length) {
            images = image[0];
        };

        MarketingTool.find()
            .then(response => {
                res.status(200).json(serializer(200, { tools: [...response], images: images }));
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
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            MarketingTool.findById(id)
                .then(t => {
                    t.title = title;
                    t.description = description;

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




module.exports = { GetMarketingTools, AddMarketingTool, DeleteMarketingTool, UpdateMarketingTool }