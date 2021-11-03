const jwt = require('jsonwebtoken');
const env = require('../.env');

const authMidleware = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
       req.userData = decodedToken;
       next();
       
   } catch (error) {
       return res.status(401).json({status: false, message: "Your session is not valid.", data: error});
   }


};

module.exports = authMidleware