import React from "react";
import UserContextProvider from "./context/user/UserContextProvider";
import Login from "./features/Login/Login";
import ThemeContextProvider from "./context/theme/ThemeContextProvider";

const App = () => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Login />
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
