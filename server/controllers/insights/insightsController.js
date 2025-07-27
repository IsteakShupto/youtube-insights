const insightsController = async (req, res) => {
  res.json({ hello: process.env.YT_INSIGHTS_API_KEY });
};

module.exports = insightsController;
