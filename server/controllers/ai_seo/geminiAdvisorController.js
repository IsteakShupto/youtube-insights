const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAdvisedContent = async (req, res) => {
  const { title, description, tags } = req.body;

  if (!title && !description && !tags) {
    return res.status(400).json({
      message: "At least one field is required.",
    });
  }

  try {
    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a YouTube SEO expert. Suggest an improved video title, a better thumbnail idea, and optimized tags based on the info below:

Title: ${title || "N/A"}
Description: ${description || "N/A"}
Tags: ${tags?.join(", ") || "N/A"}

Return in JSON with keys: improvedTitle, thumbnailIdea, suggestedTags.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Unexpected AI response format");

    const data = JSON.parse(match[0]);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Failed to generate suggestions.",
      error: err.message,
    });
  }
};

module.exports = getAdvisedContent;
