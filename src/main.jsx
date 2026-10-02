import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";

/**
 * HashRouter is used deliberately: GitHub Pages serves static files only, so
 * client-side routes such as /projects/nebula-analytics have no server rewrite.
 * With hash routing every deep link works on Pages out of the box.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
