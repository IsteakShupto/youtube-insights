import { useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { Sparkles, Lightbulb, Tag, Image } from "lucide-react";
import VideoAnalyticsNavbar from "../components/VideoAnalyticsNavbar";
import Footer from "../components/Footer";

export default function AiSeoAdvisor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() && !description.trim() && !tags.trim()) {
      setError("Please enter at least one field.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "https://youtube-insights.onrender.com/api/yt-advisor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            tags: tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to get suggestions.");
      } else {
        setResult(data);
      }
    } catch (err) {
      console.log(err.message);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <VideoAnalyticsNavbar />
      <div className="text-center mt-12 mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          YouTube AI
          <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Advisor
          </span>
        </h1>
        <p className="px-6 sm:px-0 text-lg text-gray-600 max-w-3xl mx-auto">
          Boost your video performance with AI-powered insights that optimize
          titles, thumbnails, and tags for maximum SEO impact. Transform your
          content strategy and reach millions more viewers effortlessly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100 my-12">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 font-medium text-gray-700"
            >
              Video Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your video title"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 font-medium text-gray-700"
            >
              Video Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your video description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block mb-2 font-medium text-gray-700"
            >
              Tags (comma separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="example: gaming, tutorial, funny"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 py-4 transition disabled:bg-blue-400 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Get SEO Suggestions
              </>
            )}
          </button>

          {error && (
            <div className="flex items-center gap-2 text-red-600 font-medium mt-4">
              <AlertTriangle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered Suggestions
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Optimized Title
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {result.improvedTitle}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      SEO Optimized
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Image className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Thumbnail Strategy
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {result.thumbnailIdea}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-cyan-600 font-medium bg-cyan-50 px-3 py-1 rounded-full">
                      Click-Worthy Design
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Strategic Tags
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.suggestedTags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 hover:bg-green-100 transition-colors duration-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                      High Search Volume
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
