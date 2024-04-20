// import express from 'express';
// import UserController from '../Controllers/UserController';
// const router = express.Router();
// const userController = new UserController();
// router.get('/users', userController.newUser.bind(userController));
// router.get('/users/all', userController.findAll.bind(userController));
// router.put('/users/update', userController.update.bind(userController));
// router.get('/users/find', userController.findUser.bind(userController));
// router.delete('/users/delete', userController.delete.bind(userController));
// module.exports = router;
import express from 'express';
import UserController from "../Controllers/UserController";
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");
import { upload } from "../Middlewares/upimage"; 
const router = express.Router();
const userController = new UserController();
router.post("/user/login", userController.login);
router.post("/user/register", userController.createUser);
router.post("/user/forgot-password", userController.forgotPassword);
router.post("/user/verify-forgot-password", userController.verifyForgotPasswordByEmailCode);
router.post("/user/updatePassword", userController.updatePassword)
router.post("/user/updateImage", upload.single('imageUser'), userController.updateImage);

module.exports = router;

