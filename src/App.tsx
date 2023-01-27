import React from "react";
import { Toast } from "./common/components/Toast/Toast";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <Toast />
    </div>
  );
}

export default App;
