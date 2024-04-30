import MajorController from "../Controllers/MajorController";

const express = require('express');
const router = express.Router();

const majorController = new MajorController();

router.post("/major", majorController.createMajor);
module.exports = router