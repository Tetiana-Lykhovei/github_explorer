import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { useRoutes } from "./routes";

function App() {
  const routes = useRoutes();
  return (
    <div className="App">
      <Router>
        <div>{routes}</div>
      </Router>
    </div>
  );
}

export default App;
