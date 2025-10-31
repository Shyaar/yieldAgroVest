// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AppKitProvider } from "./components/providers/AppKitProvider.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppKitProvider>
        <App />
        <ToastContainer />
      </AppKitProvider>
    </BrowserRouter>
  </React.StrictMode>
);
