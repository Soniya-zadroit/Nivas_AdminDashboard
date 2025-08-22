// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import App from "./App";
import "./index.css";

// PrimeReact core + theme
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-orange/theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App/>
    </PrimeReactProvider>
  </React.StrictMode>
);
