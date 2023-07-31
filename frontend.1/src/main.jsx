import React from "react";
import { UserProvider } from "./context/UserContext";
import { FilterProvider } from "./context/FilterContext";

import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </UserProvider>
  </React.StrictMode>
);
