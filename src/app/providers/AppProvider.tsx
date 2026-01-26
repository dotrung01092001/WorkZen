import { AuthProvider } from "@/contexts/AuthContext";
import { UIProvider } from "@/contexts/UIContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UIProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </UIProvider>
    </AuthProvider>
  );
}
