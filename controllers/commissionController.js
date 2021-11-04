const Commission = require('./../database/schemas/CommissionSchema');
const serializer = require('./../utils/serializer');
const AmountRange = require('./../database/schemas/amountRangeSchema');


const GetCommissions = async (req, res, next) => {
    console.log('getCommissions')
    try {
        let amountRanges = await AmountRange.find();
        Commission.find()
            .then(response => {
                response[0].amountRanges = [...amountRanges]
                res.status(200).json(serializer(200, { commissions: response }));

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

const AddCommission = async (req, res) => {
    const { description, imgUrl } = req.body;
    if (!description) {
        res.status(200).json(serializer(200, null, false, { message: "Description shouldn't be empty!" }));
    } else {
        try {
            let newDescription = {
                en: description.en || description.ru,
                ru: description.ru || description.en
            };

            const commission = new Commission({
                description: newDescription,
                
                imgUrl: imgUrl
            });
            commission.save()
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

const UpdateCommission = async (req, res, next) => {
    const { id } = req.params;
    const { description, revenue, imgUrl } = req.body;
    if (!description) {
        res.status(200).json(serializer(200, null, false, { message: "Title or Description shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            Commission.findById(id)
                .then(c => {
                    c.description = description;
                    c.revenue = revenue;
                    c.imgUrl = imgUrl;

                    return c.save();
                })
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'Commission was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Commission with id=${id}. Commission was not found!` }));
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

const DeleteCommission = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            Commission.findByIdAndRemove(id)
                .then(response => {
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'Commission was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Commission with id=${id}. Commission was not found!` }));
                    };
                })
                .catch(error => {
                    next();
                    throw new Error(error);
                });
        } catch (error) {
            console.log(error);
            res.status(500).json(error, { message: "Could not delete Commission with id=" + id });
        };
    } else {
        next();
    };
};


module.exports = { GetCommissions, AddCommission, DeleteCommission, UpdateCommission }