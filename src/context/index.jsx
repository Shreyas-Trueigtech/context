import { UserProvider, useUser } from "./user/userContext.jsx";
import { ThemeProvider, useTheme } from "./theme/themeContext.jsx";

const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  );
};

export const useAppState = () => {
  const userState = useUser();
  const themeState = useTheme();

  return {
    ...userState,
    ...themeState,
  };
};

export { UserProvider, useUser } from "./user/userContext.jsx";
export { ThemeProvider, useTheme } from "./theme/themeContext.jsx";
export default AppProvider;
