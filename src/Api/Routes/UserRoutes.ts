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
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/authMiddleware");
const router = express.Router();
const userController = new UserController();
router.post("/user/login", userController.login)
router.post("/user/register", userController.createUser)

module.exports = router;

