const Affiliate = require('../database/schemas/AffiliateSchema');
const Image = require('../database/schemas/ImageSchema');
const serializer = require('../utils/serializer');


const GetAffiliate = async (req, res, next) => {
    try {
        let banners = await Image.find({ relatesTo: 'Affiliate' });
        console.log(banners)
        await Affiliate.find()
            .then(response => {
                console.log('Affiliate',response)
                response[0].images = banners;
                res.status(200).json(serializer(200, { affiliates: response }, true));
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

const AddAffiliate = async (req, res, next) => {

    const { title, subTitle } = req.body;
    if (!title || !subTitle) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Subtitle shouldn't be empty!" }));
    } else {
        try {
            let newTitle = {
                en: title.en || title.ru,
                ru: title.ru || title.en,
            };

            let newSubTitle = {
                en: subTitle.en || subTitle.ru,
                ru: subTitle.ru || subTitle.en
            };

            const newAffiliate = new Affiliate({
                title: newTitle,
                subTitle: newSubTitle,
                images: []
            });
            newAffiliate.save()
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

const UpdateAffiliate = async (req, res, next) => {
    const { id } = req.params;
    const { title, subTitle, imgUrl } = req.body;
    if (!title || !subTitle) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            Affiliate.findById(id)
                .then(aff => {
                    aff.title = title;
                    aff.subTitle = subTitle;
                    aff.imgUrl = imgUrl;

                    return aff.save();
                })
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'Affiliate was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Affiliate with id=${id}. Affiliate was not found!` }));
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

const DeleteAffiliate = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            Affiliate.findByIdAndRemove(id)
                .then(response => {
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'Affiliate was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Affiliate with id=${id}. Affiliate was not found!` }));
                    };
                })
                .catch(error => {
                    next();
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error, { message: "Could not delete Affiliate with id=" + id });
        };
    } else {
        next();
    };
};









module.exports = { GetAffiliate, AddAffiliate, DeleteAffiliate, UpdateAffiliate }