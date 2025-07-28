const express = require("express");
const getAdvisedContent = require("../../controllers/ai_seo/geminiAdvisorController");

const geminiRouter = express.Router();

geminiRouter.post("/", getAdvisedContent);

module.exports = geminiRouter;
