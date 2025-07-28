import { useState } from "react";
import { AlertTriangle, Search, TrendingUp } from "lucide-react";
import Analytics from "../components/Analytics";
import VideoAnalyticsNavbar from "../components/VideoAnalyticsNavbar";
import Footer from "../components/Footer";
import SentimentAnalysis from "../components/SentimentAnalysis";

export default function VideoAnalytics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError("");
    setVideoData(null);

    try {
      const res = await fetch(
        `https://youtube-insights.onrender.com/api/yt-insights?url=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await res.json();

      if (res.ok) {
        setVideoData(data);
        console.log(data);
      } else {
        setError(
          data?.message ||
            "Something went wrong / please enter correct youtube url"
        );
      }
    } catch (err) {
      setError("Network error. Please try again.", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VideoAnalyticsNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter video URL or search query..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg transition-all duration-300"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none flex items-center justify-center min-w-[140px]"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                    Analyze
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="flex items-center justify-center gap-2 text-red-600 mt-8 text-center font-medium">
              <AlertTriangle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {videoData && (
          <div className="space-y-8">
            <Analytics
              title={videoData.title}
              channelTitle={videoData.channelTitle}
              publishedAt={videoData.publishedAt}
              thumbnail={videoData.thumbnail}
              views={videoData.views}
              likes={videoData.likes}
              favorites={videoData.favorites}
              comments={videoData.comments}
              engagementRate={videoData.engagementRate}
            />
            <SentimentAnalysis 
              videoUrl={searchQuery} 
              isVisible={true}
            />
          </div>
        )}

        {!videoData && !isLoading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Ready to Analyze
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a video URL or search query above to get detailed analytics and
              insights.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
