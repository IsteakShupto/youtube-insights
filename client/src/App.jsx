function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          YouTube Insights
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Track, analyze, and optimize your YouTube content with real-time data
          and smart recommendations.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg transition">
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">📊 Real-time Stats</h3>
            <p>See views, likes, comments, and other metrics live.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">👥 Audience Insights</h3>
            <p>Understand who watches your videos and when.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">🎯 Optimization Tips</h3>
            <p>Get personalized suggestions to improve performance.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>
          &copy; {new Date().getFullYear()} YouTube Insights. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
