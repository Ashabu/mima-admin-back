const express = require('express');

const userController = require('../controllers/userController');
const authMidleware = require('../middleware/authMidleware');

const router = express.Router();

router.get('/getUsers', userController.getUsers);

router.post('/signUp', userController.singUp);

router.post('/signIn', userController.signIn);

router.put('/editUser/:id',userController.updateUser);

router.delete('/deleteUser/:id', userController.deleteUser);


module.exports = router;