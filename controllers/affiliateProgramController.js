const AffiliateProgram = require('./../database/schemas/AffiliateProgramSchema');
const Picture = require('./../database/schemas/PictureSchema');
const serializer = require('./../utils/serializer');


const getAffiliatePrograms = async (req, res, next) => {
    try {
        AffiliateProgram.find()
            .then(response => {
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

const AddAffiliateProgram = async (req, res, next) => {

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

            const affiliateProgram = new AffiliateProgram({
                title: newTitle,
                subTitle: newSubTitle,
            });
            affiliateProgram.save()
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

const UpdateAffiliateProgram = async (req, res, next) => {
    const { id } = req.params;
    const { title, subTitle, imgUrl } = req.body;
    if (!title || !subTitle) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            AffiliateProgram.findById(id)
                .then(ap => {
                    ap.title = title;
                    ap.subTitle = subTitle;
                    ap.imgUrl = imgUrl;

                    return ap.save();
                })
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'AffiliateProgram was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update AffiliateProgram with id=${id}. AffiliateProgram was not found!` }));
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
                    next();
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error, { message: "Could not delete AffiliateProgram with id=" + id });
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
        const mainInfo = await AffiliateProgram.findById({ _id: newPicture.relatesTo });
        mainInfo.images.push(newPicture)

        await mainInfo.save();
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
            AffiliateProgram.findById(id).then(p => {
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

// const UpdatePicture = async (req, res, next) => {
//     const { id } = req.params;
//     const { pictureId, imgUrl } = req.body;

//     if (!pictureId) {
//         res.status(200).json(serializer(200, null, false, { message: "Picture id shouldn't be empty" }));
//     } else if (id !== "") {
//         try {
//             AffiliateProgram.findById(id).then(p => {
//                 let updatedImage = p.images.filter(img => img._id.toString() == pictureId);
//                 updatedImage.url = imgUrl;
//                 p.images = updatedImages;
//                 return p.save()
//             })
//                 .catch(e => {
//                     console.log(e)
//                 })
//                 .then(response => {
//                     if (response) {
//                         res.status(201).json(serializer(201, { message: 'Picture was updated successfully!' }));
//                     } else {
//                         res.status(200).json(serializer(200, null, false, { message: `Cannot update Picture with id=${id}. Picture was not found!` }));
//                     };
//                 })
//                 .catch(e => {
//                     next(e);
//                 });
//         } catch (e) {
//             res.status(500).json(error, { error: e, message: "Something Went Wrong", });
//         };
//     };
// };






module.exports = { getAffiliatePrograms, AddAffiliateProgram, DeleteAffiliateProgram, UpdateAffiliateProgram, AddPicture, DeletePicture }