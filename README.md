# YouTube Insights – AI-Powered Video Intelligence Platform

![YouTube Insights Banner](./extras/project-banner.png)

YouTube Insights is a full-stack web application that brings smart analytics to YouTube videos using advanced AI from **Google Gemini**. It offers sentiment analysis, SEO optimization, and trending insights for creators, marketers, and analysts.

## Live Application

Access the app at: [https://yt-insights.netlify.app/](https://yt-insights.netlify.app/)

---

## Features

- **Video Performance Analytics**: Core metrics like views, likes, comments, and engagement rate.
- **AI Sentiment Analysis**: Extract emotional tone and sentiment from YouTube comments.
- **Real-Time Insights**: Analyze video performance and sentiment instantly using AI.
- **AI SEO Advisor**: Generate high-performing titles, engaging thumbnail ideas, and keyword-rich tag suggestions powered by Gemini.
- **SEO Tag Optimizer**: Supercharge discoverability with intelligent tagging recommendations.
- **Modern Responsive UI**: Built with TailwindCSS and React, fully responsive on all screen sizes.

---

## Quick Start

### Requirements

- Node.js 20+
- YouTube Data API v3 key
- Google Gemini API key

### Installation

1. **Clone the repository and install dependencies**

```bash
git clone <repository-url>
cd youtube-insights

# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

2. **Set up environment variables**

```bash
cd server
cp .env.example .env
# Edit .env with your own API keys
```

Edit `.env`:

```env
YT_INSIGHTS_API_KEY=your_youtube_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

3. **Run the development servers**

```bash
# Terminal 1 - Start Backend
cd server && npm run dev

# Terminal 2 - Start Frontend
cd client && npm run dev
```

Access the app locally:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000/api](http://localhost:3000/api)

---

## API Keys

### YouTube Data API

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Enable **YouTube Data API v3**
3. Generate an API key and add it to `YT_INSIGHTS_API_KEY` in your `.env`

### Google Gemini API

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Generate an API key and add it to `GEMINI_API_KEY` in your `.env`

---

## API Endpoints

| Method | Endpoint                  | Description                                                            |
| ------ | ------------------------- | ---------------------------------------------------------------------- |
| GET    | `/api/yt-insights`        | Retrieve detailed analytics for a specific YouTube video               |
| GET    | `/api/yt-trendings`       | Fetch trending videos by country and category                          |
| POST   | `/api/sentiment-analysis` | Perform sentiment analysis on comments using AI                        |
| POST   | `/api/yt-advisor`         | Generate improved titles, thumbnails, and tag suggestions using Gemini |

---

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **AI & Data**: Google Gemini API, YouTube Data API v3

---

## Project Structure

```
youtube-insights/
├── client/                       # React frontend
│   ├── src/components/
│   │   ├── Analytics.jsx
│   │   ├── SentimentAnalysis.jsx
│   │   └── GeminiAdvisor.jsx     # AI SEO assistant component
│   └── src/pages/
│       ├── VideoAnalytics.jsx
│       └── TrendingAnalytics.jsx
│
├── server/                       # Node.js backend
│   ├── controllers/
│   │   ├── sentiment/
│   │   │   └── sentimentController.js
│   │   └── ai_seo/
│   │       └── geminiAdvisorController.js
│   └── routes/
│       ├── sentiment/
│       │   └── sentimentRoute.js
│       └── ai_seo/
│           └── geminiRoute.js
│
└── deploy-check.sh              # Simple deployment readiness script
```

---

## Deployment

You can deploy the application on platforms like **Render**, **Railway**, or **Netlify**.

- **Frontend**: Build and deploy the `/client` directory.

  ```bash
  cd client && npm run build
  ```

- **Backend**: Deploy the `/server` directory. Ensure environment variables are set.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Let me know if you also want a `GeminiAdvisor.jsx` component example or auto-deployment scripts for Netlify/Render.
