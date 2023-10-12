import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

const container: Element | DocumentFragment = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
