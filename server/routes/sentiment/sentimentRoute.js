const express = require("express");
const sentimentController = require("../../controllers/sentiment/sentimentController");

const router = express.Router();

router.get("/", sentimentController);

module.exports = router;
