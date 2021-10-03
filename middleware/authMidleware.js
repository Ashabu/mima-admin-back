const jwt = require('jsonwebtoken');

const authMidleware = (req, res, next) => {
    // const token = req.header("x-auth-token");
    // if (!token) return res.status(401).send('Unauthorized request...');

    // try {
    //     const secretKey = process.env.SECRET_KEY;
    //     const payload = jwt.verify(token, secretKey);
    //     req.user = payload;
    //     next();
    // } catch (error) {
    //     console.log(error);
    //     return res.status(400).send('Invalid Token');
    // };
    next();
};

module.exports = authMidleware