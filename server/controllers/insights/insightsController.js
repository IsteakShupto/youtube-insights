const dotenv = require("dotenv");
dotenv.config();

const YT_INSIGHTS_API_KEY = process.env.YT_INSIGHTS_API_KEY;

function extractVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const insightsController = async (req, res) => {
  const { url } = req.query;
  const videoOrShortsId = extractVideoId(url);

  if (!videoOrShortsId) {
    return res.status(400).json({ error: "Invalid Youtube URL." });
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoOrShortsId}&key=${YT_INSIGHTS_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({
        error: "Video not found.",
      });
    }

    const item = data.items[0];
    const stats = item.statistics;
    const snippet = item.snippet;

    const engagementRate = (
      ((+stats.likeCount + +stats.commentCount) / +stats.viewCount) *
      100
    ).toFixed(2);

    res.json({
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      publishedAt: snippet.publishedAt,
      thumbnail: snippet.thumbnails?.medium?.url,
      views: stats.viewCount,
      likes: stats.likeCount,
      favorites: stats.favoriteCount,
      comments: stats.commentCount,
      engagementRate: `${engagementRate}%`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch Youtube data.",
    });
  }
};

module.exports = insightsController;
