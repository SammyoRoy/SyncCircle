import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
