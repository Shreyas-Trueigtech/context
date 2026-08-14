import React from "react";
import { TooltipProvider } from "./components/ui/tooltip";
import AppRoutes from "./router/AppRoutes";

const App = () => {
  return (
    <TooltipProvider>
      <AppRoutes />
    </TooltipProvider>
  );
};

export default App;
