const models = require('./../database/models');
const serializer = require('./../utils/serializer');


const getMainBanner = async (req, res, next) => {
    try {
        return await models.MainBanner.findAll()
            .then(response => {
                res.status(200).json(serializer(200, { mainBanner: response }));
            })
            .catch(error => {
                throw new (error)
            });
    } catch (error) {
        console.log(error)
        res.status(500).json(error, { message: "Something Went Wrong" });
    };
};

const AddMainBanner = async (req, res, next) => {
    const { mainText, subText, mainImg, sideImgRight, sideImgLeft } = req.body;
    if (!mainText) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Image shouldn't be empty!" }));
    } else {
        try {
            return await models.MainBanner.create({ mainText, subText, mainImg, sideImgRight, sideImgLeft })
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

const UpdateMainBanner = async (req, res, next) => {
    const { id } = req.params;
    const { mainText, subText, mainImg, sideImgRight, sideImgLeft } = req.body;
    if (!mainText) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Image shouldn't be empty!" }));
    } else if (id > 0 && !isNaN(id)) {
        try {
            return await models.MainBanner.update({ mainText, subText, mainImg, sideImgRight, sideImgLeft }, { where: { id } })
                .then(response => {
                    if (response == 1) {
                        res.status(201).json(serializer(201, { message: 'MainBanner was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update MainBanner with id=${id}. MainBanner was not found!` }));
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

// const DeleteMainBanner = async (req, res, next) => {
//     const { id } = req.params;
//     if (id > 0 && !isNaN(id)) {
//         try {
//             return await models.MainBanner.destroy({ where: { id: id } })
//                 .then(response => {
//                     if (response == 1) {
//                         res.status(202).json(serializer(202, { message: 'MainBanner was deleted successfully!' }));
//                     } else {
//                         res.status(200).json(serializer(200, null, false, { message: `Cannot delete MainBanner with id=${id}. MainBanner was not found!` }));
//                     };
//                 })
//                 .catch(error => {
//                     throw new Error(error);
//                 });
//         } catch (error) {
//             console.log(error)
//             res.status(500).json(error, { message: "Could not delete MainBanner with id=" + id });
//         };
//     } else {
//         next();
//     };
// };


module.exports = { getMainBanner, AddMainBanner, UpdateMainBanner } // DeleteMainBanner,