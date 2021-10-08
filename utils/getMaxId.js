module.exports = (model, key) => {
    return new Promise((resolve, reject) => {
        model.findOne().sort(`-${key}`).exec((err, item) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(item);
            }
        });
    })
}