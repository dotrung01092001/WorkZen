import { createContext, useState, type ReactNode } from 'react';
import { useEmployee } from './EmployeeContext';
import type { AuthUser } from '@/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { employees } = useEmployee();
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const found = employees.find(
        (employee) =>
          employee.email === email &&
          (employee.password ? employee.password === password : password === "123456"),
      );

      if (!found) {
        throw new Error('Invalid credentials')
      }

      const safeUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
      };

      setUser(safeUser);
      localStorage.setItem('auth_user', JSON.stringify(safeUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
