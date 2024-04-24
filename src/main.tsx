import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import "tailwindcss/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
