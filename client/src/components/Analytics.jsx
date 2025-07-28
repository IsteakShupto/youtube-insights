import {
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  User,
} from "lucide-react";
import SentimentAnalysis from "./SentimentAnalysis";

export default function Analytics({
  title,
  channelTitle,
  publishedAt,
  thumbnail,
  views,
  likes,
  favorites,
  comments,
  engagementRate,
  searchQuery,
  isVisible,
}) {
  const formatNumber = (num) => {
    const number = parseInt(num);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    }
    return number.toLocaleString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Video Analytics
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get comprehensive insights and analytics for any YouTube video with
            our advanced tracking system.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-6 p-6">
            <img
              src={thumbnail}
              alt={title}
              className="w-full md:w-64 aspect-video rounded-xl object-cover border border-gray-200"
            />
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h2>
              <div className="flex items-center text-gray-700 text-lg">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                <span>{channelTitle}</span>
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Published on {formatDate(publishedAt)}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <Eye className="w-8 h-8 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600 bg-blue-200 px-2 py-1 rounded-full">
                    Views
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {formatNumber(views)}
                </div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
                <div className="flex items-center justify-between mb-3">
                  <Heart className="w-8 h-8 text-red-600" />
                  <span className="text-sm font-medium text-red-600 bg-red-200 px-2 py-1 rounded-full">
                    Likes
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {formatNumber(likes)}
                </div>
                <div className="text-sm text-gray-600">Total Likes</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                  <span className="text-sm font-medium text-green-600 bg-green-200 px-2 py-1 rounded-full">
                    Comments
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {formatNumber(comments)}
                </div>
                <div className="text-sm text-gray-600">Total Comments</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600 bg-purple-200 px-2 py-1 rounded-full">
                    Engagement
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {engagementRate}
                </div>
                <div className="text-sm text-gray-600">Engagement Rate</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between mb-3">
                  <Heart className="w-8 h-8 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-600 bg-yellow-200 px-2 py-1 rounded-full">
                    Favorites
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {formatNumber(favorites)}
                </div>
                <div className="text-sm text-gray-600">Total Favorites</div>
              </div>
            </div>

            <SentimentAnalysis videoUrl={searchQuery} isVisible={isVisible} />

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-10">
              <div className="flex justify-center items-center mb-4">
                <Calendar className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-gray-900 font-medium">
                  Published on {formatDate(publishedAt)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-gray-600">Views per day</span>
                  <span className="font-semibold text-gray-900">
                    {Math.round(
                      parseInt(views) /
                        Math.max(
                          1,
                          Math.floor(
                            (Date.now() - new Date(publishedAt).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )
                        )
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-gray-600">Like ratio:</span>
                  <span className="font-semibold text-gray-900">
                    {((parseInt(likes) / parseInt(views)) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-gray-600">Comments ratio:</span>
                  <span className="font-semibold text-gray-900">
                    {((parseInt(comments) / parseInt(views)) * 100).toFixed(3)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
