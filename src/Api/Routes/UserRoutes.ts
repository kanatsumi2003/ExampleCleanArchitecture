import express from 'express';
import UserController from '../Controllers/UserController';
const router = express.Router();
const userController = new UserController;
router.get('/users', userController.newUser);
module.exports = router;