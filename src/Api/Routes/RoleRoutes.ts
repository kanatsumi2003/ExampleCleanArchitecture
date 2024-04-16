import RoleController from "../Controllers/RoleController";
import express from 'express';

const router = express.Router();

const roleController = new RoleController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/authMiddleware");

const endpoint = "/role";
// router.post("/roles", roleController.getRoleById.bind(roleController));
// router.post("/roles/create-role", roleController.createRole.bind(roleController));
router.post(endpoint, authenticateToken, authorizationMiddleware(["Admin"]), roleController.getRoleById);
router.post(endpoint + '/create-role', authenticateToken, authorizationMiddleware(["Admin"]), roleController.createRole);
module.exports = router