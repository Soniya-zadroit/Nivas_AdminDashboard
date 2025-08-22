// App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Mainroutes from "./MainRoutes/Mainroutes";

const App: React.FC = () => {
  return (
    <Router>
      <Mainroutes />
    </Router>
  );
};

export default App;
