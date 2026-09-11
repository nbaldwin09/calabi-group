import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import "./app.css";
import "./tokens.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div data-brand="calabi">
        <App />
        <Analytics />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
);
