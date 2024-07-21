import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UIProvider } from "@yamada-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UIProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UIProvider>
);
