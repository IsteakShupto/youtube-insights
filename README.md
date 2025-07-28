# YouTube Insights - AI Sentiment Analysis

A modern web application that analyzes YouTube videos and provides AI-powered sentiment analysis of comments using Google Gemini.

## ✨ Features

- **YouTube Video Analytics**: Basic metrics (views, likes, comments, engagement rate)
- **AI Sentiment Analysis**: Intelligent comment analysis with Google Gemini AI
- **Real-time Analysis**: Instant sentiment scoring and emotional tone detection
- **Responsive Design**: Optimized for desktop and mobile

## � Quick Start

### Prerequisites
- Node.js 20+
- YouTube Data API v3 key
- Google Gemini API key

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd youtube-insights

# Install backend dependencies
cd server && npm install

# Install frontend dependencies  
cd ../client && npm install
```

2. **Configure environment variables:**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
YT_INSIGHTS_API_KEY=your_youtube_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

3. **Run the application:**
```bash
# Terminal 1: Start backend
cd server && npm run dev

# Terminal 2: Start frontend
cd client && npm run dev
```

4. **Access the app:**
- Frontend: http://localhost:5173/analytics
- Backend API: http://localhost:3000

## 🔑 API Keys Setup

### YouTube Data API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable YouTube Data API v3
3. Create API key and add to `YT_INSIGHTS_API_KEY`

### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key and add to `GEMINI_API_KEY`

## 📊 API Endpoints

```
GET /api/yt-insights?url=<youtube_url>          # Basic video analytics
GET /api/sentiment-analysis?url=<youtube_url>   # AI sentiment analysis
```

## 🏗️ Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, Lucide Icons
- **Backend**: Node.js, Express, Google Gemini AI
- **APIs**: YouTube Data API v3, Google Gemini

## � Project Structure

```
youtube-insights/
├── client/                 # React frontend
│   ├── src/components/
│   │   └── SentimentAnalysis.jsx
│   └── src/pages/
│       └── VideoAnalytics.jsx
├── server/                 # Node.js backend
│   ├── controllers/sentiment/
│   │   └── sentimentController.js
│   └── routes/sentiment/
│       └── sentimentRoute.js
└── deploy-check.sh        # Deployment verification script
```

## � Development

**Start development servers:**
```bash
npm run dev    # In both /server and /client directories
```

**Build for production:**
```bash
cd client && npm run build
```

## 🚀 Deployment

The application is ready for deployment on platforms like Railway, Render, or Netlify.

**Backend**: Deploy `/server` directory with environment variables
**Frontend**: Deploy `/client/dist` after build

## � License

MIT License
