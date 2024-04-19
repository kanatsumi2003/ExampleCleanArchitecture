import RoleController from "../Controllers/RoleController";
import express from 'express';

const router = express.Router();

const roleController = new RoleController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/authMiddleware");


// router.post("/roles", roleController.getRoleById.bind(roleController));
// router.post("/roles/create-role", roleController.createRole.bind(roleController));
router.post("/role", roleController.getRoleById);
router.post("/role/create-role",roleController.createRole);
module.exports = router