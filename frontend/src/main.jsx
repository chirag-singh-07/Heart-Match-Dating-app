import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LoveToast from "./components/common/LoveToast";
import { SocketProvider } from "./contexts/SocketContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <App />
        <LoveToast />
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>
);
