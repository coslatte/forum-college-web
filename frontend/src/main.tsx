import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/tailwind.css";
import App from "./components/main/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
