import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import VideoAnalytics from "./pages/VideoAnalytics.jsx";
import AiSeoAdvisor from "./pages/AiSeoAdvisor.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/analytics",
    element: <VideoAnalytics />,
  },
  {
    path: "/advisor",
    element: <AiSeoAdvisor />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
