import { useState } from "react";
import { 
  MessageCircle, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Brain,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Lightbulb,
  Users
} from "lucide-react";

export default function SentimentAnalysis({ videoUrl, isVisible }) {
  const [sentimentData, setSentimentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeSentiment = async () => {
    if (!videoUrl) return;
    
    setIsLoading(true);
    setError("");
    setSentimentData(null);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        
      const response = await fetch(
        `${baseUrl}/api/sentiment-analysis?url=${encodeURIComponent(videoUrl)}`
      );
      const data = await response.json();

      if (response.ok) {
        setSentimentData(data);
      } else {
        setError(data.error || "Error analizando sentimientos");
      }
    } catch (error) {
      console.error("Error al analizar sentimientos:", error);
      setError("Error de conexión. Verifica que el servidor esté ejecutándose.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case "negative":
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      default:
        return <Minus className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "from-green-500 to-emerald-500";
      case "negative":
        return "from-red-500 to-pink-500";
      default:
        return "from-yellow-500 to-orange-500";
    }
  };

  const getSentimentText = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "Positive";
      case "negative":
        return "Negative";
      default:
        return "Neutral";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mt-8 max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-white mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-white">
                AI Sentiment Analysis
              </h2>
              <p className="text-purple-100">
                Powered by Google Gemini
              </p>
            </div>
          </div>
          <button
            onClick={analyzeSentiment}
            disabled={isLoading || !videoUrl}
            className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/30 flex items-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <MessageCircle className="w-5 h-5 mr-2" />
            )}
            {isLoading ? "Analyzing..." : "Analyze Comments"}
          </button>
        </div>
      </div>

      <div className="p-8">
        {error && (
          <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg mb-6 border border-red-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {sentimentData && (
          <div className="space-y-8">
            {/* Overall Sentiment */}
            <div className="text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${getSentimentColor(sentimentData.analysis.overallSentiment)} text-white font-semibold text-lg mb-4`}>
                {getSentimentIcon(sentimentData.analysis.overallSentiment)}
                <span className="ml-2">
                  {getSentimentText(sentimentData.analysis.overallSentiment)} Sentiment
                </span>
              </div>
              <p className="text-gray-600 text-lg">
                Score: {(sentimentData.analysis.sentimentScore * 100).toFixed(1)}%
              </p>
            </div>

            {/* Sentiment Distribution */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Sentiment Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ThumbsUp className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {sentimentData.analysis.sentimentDistribution.positive}%
                  </p>
                  <p className="text-sm text-gray-600">Positive</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Minus className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {sentimentData.analysis.sentimentDistribution.neutral}%
                  </p>
                  <p className="text-sm text-gray-600">Neutral</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ThumbsDown className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">
                    {sentimentData.analysis.sentimentDistribution.negative}%
                  </p>
                  <p className="text-sm text-gray-600">Negative</p>
                </div>
              </div>
            </div>

            {/* Key Themes and Emotional Tone */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sentimentData.analysis.keyThemes.map((theme, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Emotional Tone
                </h3>
                <p className="text-purple-800 font-medium text-lg capitalize">
                  {sentimentData.analysis.emotionalTone}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-green-600" />
                Recommendations
              </h3>
              <ul className="space-y-2">
                {sentimentData.analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Analysis Summary
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {sentimentData.analysis.summary}
              </p>
            </div>

            {/* Sample Comments */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Analyzed Comments ({sentimentData.metadata.totalComments} total)
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sentimentData.sampleComments.map((comment, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-900 truncate">
                        {comment.author}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center ml-2">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {comment.likes}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      "{comment.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!sentimentData && !error && !isLoading && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Ready to Analyze
            </h3>
            <p className="text-gray-500">
              Click "Analyze Comments" to get AI insights
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
