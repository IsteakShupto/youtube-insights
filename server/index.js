const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const insightsRouter = require("./routes/insights/insightsRoute");
const trendingsRouter = require("./routes/trendings/trendingsRoute");
const sentimentRouter = require("./routes/sentiment/sentimentRoute");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/yt-insights", insightsRouter);
app.use("/api/yt-trendings", trendingsRouter);
app.use("/api/sentiment-analysis", sentimentRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
