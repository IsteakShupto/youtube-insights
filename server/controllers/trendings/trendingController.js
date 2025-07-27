const dotenv = require("dotenv");
dotenv.config();

const getTrendingVideos = async (req, res) => {
  const country = req.query.country || "US";
  const type = req.query.type || "gaming";

  const apiUrl = `https://youtube-trending.p.rapidapi.com/trending?country=${country}&type=${type}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": "youtube-trending.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Trending API error:", error.message);
    res.status(500).json({ error: "Unable to fetch trending data" });
  }
};

module.exports = getTrendingVideos;
