import RoleController from "../Controllers/RoleController";
import express from 'express';
import VietQRController from "../Controllers/VietQRController";

const router = express.Router();

const vietQRController = new VietQRController();
router.post("/thanhtoanv2", vietQRController.thanhtoanv2);
router.get("/getthanhtoan", vietQRController.getthanhtoan);
module.exports = router;
