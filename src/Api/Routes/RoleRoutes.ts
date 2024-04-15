import RoleController from "../Controllers/RoleController";
import express from 'express';

const router = express.Router();

const roleController = new RoleController();
router.post("/roles", roleController.getRoleById.bind(roleController));

module.exports = router