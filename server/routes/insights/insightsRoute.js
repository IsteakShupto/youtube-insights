const express = require("express");
const insightsController = require("../../controllers/insights/insightsController");
const insightsRouter = express.Router();

insightsRouter.get("/", insightsController);

module.exports = insightsRouter;
