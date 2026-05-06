import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initAnalytics } from "@/lib/analytics";
import { ThemeProvider } from "@/theme/ThemeProvider";
import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
