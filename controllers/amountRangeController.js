const AmountRange = require('./../database/schemas/amountRangeSchema');
const serializer = require('./../utils/serializer');


const AddAmountRange = async (req, res, next) => {
    try {
        const { percent, range  } = req.body;
        const newAmountRange = new AmountRange({ 
            percent: percent,
            range: range,
        });
        newAmountRange.save();
        
        res.status(201).json(serializer(201, newAmountRange, true));
    } catch (err) {
        next(err)
    }
};

const UpdateAomountRange = async (req, res, next) => {
    const { id } = req.params;
    const { percent, range } = req.body;
    if (!percent || !range) {
        res.status(200).json(serializer(200, null, false, { message: "percent or range shouldn't be empty!" }));
    } else if (id !== '') {
        try {
            AmountRange.findById(id)
                .then(ar => {
                    ar.percent = percent;
                    ar.range = range;
                    return ar.save();
                })
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    if (response) {
                        res.status(201).json(serializer(201, { message: 'Amount Range was updated successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot update Amount Range with id=${id}. Commission was not found!` }));
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


const DeleteAmountRange = async (req, res, next) => {
    const { id } = req.params;
    if (id !== '') {
        try {
            AmountRange.findByIdAndRemove(id)
                .then(response => {
                    if (response) {
                        res.status(202).json(serializer(202, { message: 'Amount Range was deleted successfully!' }));
                    } else {
                        res.status(200).json(serializer(200, null, false, { message: `Cannot delete Amount Range with id=${id}. Commission was not found!` }));
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


module.exports = {UpdateAomountRange, AddAmountRange, DeleteAmountRange}