const express = require("express");
const trendingsRouter = express.Router();

const getTrendingVideos = require("../../controllers/trendings/trendingController");

trendingsRouter.get("/trending", getTrendingVideos);

module.exports = trendingsRouter;
