import React from "react";
import ReactDOM from "react-dom/client";
import { initAnalytics } from "@/lib/analytics";
import "@fontsource-variable/geist-mono";
import "./versions/latent/styles.css";
import App from "./versions/latent/App";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
