import { Zap, Shield, Users, BarChart3, Clock, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Instant Insights",
      description:
        "Get real-time analytics on your videos, audience behavior, and engagement trends, instantly.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data stays safe with industry-standard encryption and strict privacy controls for peace of mind.",
    },
    {
      icon: Users,
      title: "Team Access",
      description:
        "Invite editors, marketers, or collaborators to work together seamlessly with role-based permissions.",
    },
    {
      icon: BarChart3,
      title: "Deep Analytics",
      description:
        "Unlock in-depth data like watch time, retention, and traffic sources to fuel your strategy.",
    },
    {
      icon: Clock,
      title: "Always Available",
      description:
        "Access insights 24/7, from anywhere, so you never miss a beat in your content journey.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description:
        "Analyze your channel on the go with responsive design and mobile-first performance.",
    },
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose YouTube Insights?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the tools you need to analyze content, optimize performance, and
            grow your channel smarter than ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            <Link to={"/analytics"}>Explore All Features</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
