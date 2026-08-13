import React from "react";
import Login from "./features/Login/Login";
import { TooltipProvider } from "./components/ui/tooltip";

const App = () => {
  return (
    <TooltipProvider>
      <Login />
    </TooltipProvider>
  );
};

export default App;
