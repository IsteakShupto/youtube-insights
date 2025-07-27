import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-[380px] z-50">
      <div className="bg-white text-gray-800 border border-gray-200 rounded-xl px-5 py-4 shadow-lg flex flex-col gap-3">
        <div className="flex items-start gap-1.5 text-md text-gray-700 leading-snug">
          <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <span>
            We use cookies to improve your experience. See our{" "}
            <a
              href="/"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Privacy Policy.
            </a>
          </span>
        </div>
        <button
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg w-full sm:w-auto sm:ml-auto transition duration-300"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
