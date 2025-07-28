const { GoogleGenerativeAI } = require("@google/generative-ai");

function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function getVideoComments(videoId, apiKey) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=50&order=relevance`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (!data.items) {
      return [];
    }
    
    return data.items.map(item => ({
      text: item.snippet.topLevelComment.snippet.textDisplay,
      author: item.snippet.topLevelComment.snippet.authorDisplayName,
      likeCount: item.snippet.topLevelComment.snippet.likeCount
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

async function analyzeSentimentWithGemini(comments) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const commentsText = comments.slice(0, 10).map((comment, index) => 
      `${index + 1}. "${comment.text.substring(0, 150)}"`
    ).join("\n");
    
    const prompt = `Analyze these YouTube comments and respond ONLY with valid JSON in English:

${commentsText}

Required format:
{
  "overallSentiment": "positive",
  "sentimentScore": 0.5,
  "sentimentDistribution": {"positive": 50, "negative": 25, "neutral": 25},
  "keyThemes": ["theme1", "theme2"],
  "emotionalTone": "mixed",
  "recommendations": ["recommendation1"],
  "summary": "Brief summary"
}

Instructions:
- overallSentiment: "positive", "negative", or "neutral"
- sentimentScore: 0.0 to 1.0 (1.0 = very positive)
- sentimentDistribution: percentages that sum to 100
- keyThemes: 3-5 main topics discussed
- emotionalTone: emotional characteristics (excited, nostalgic, critical, etc.)
- recommendations: 2-4 actionable insights for content creators
- summary: 1-2 sentences describing the overall community sentiment

Respond in English only with valid JSON.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error("No JSON found");
    
  } catch (error) {
    return {
      overallSentiment: "neutral",
      sentimentScore: 0,
      sentimentDistribution: { positive: 33, negative: 33, neutral: 34 },
      keyThemes: ["Analysis error"],
      emotionalTone: "mixed",
      recommendations: ["Check configuration"],
      summary: "AI analysis error occurred"
    };
  }
}

async function sentimentController(req, res) {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ 
        error: "Video URL required",
        usage: "GET /api/sentiment-analysis?url=<youtube_url>"
      });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    if (!process.env.YT_INSIGHTS_API_KEY || !process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "API keys not configured. Check your .env file" 
      });
    }

    console.log(`Analyzing comments for video: ${videoId}`);
    
    const comments = await getVideoComments(videoId, process.env.YT_INSIGHTS_API_KEY);
    
    if (comments.length === 0) {
      return res.status(404).json({ 
        error: "No comments found for this video" 
      });
    }

    const analysis = await analyzeSentimentWithGemini(comments);
    
    res.json({
      success: true,
      videoId,
      analysis,
      metadata: {
        totalComments: comments.length,
        analyzedAt: new Date().toISOString()
      },
      sampleComments: comments.slice(0, 3).map(c => ({
        author: c.author,
        text: c.text.substring(0, 100) + "...",
        likes: c.likeCount
      }))
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message
    });
  }
}

module.exports = sentimentController;
