import { createContext, useState, type ReactNode } from 'react';
import { useEmployee } from './EmployeeContext';
import type { AuthUser } from '@/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => void;
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
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (email: string, password: string) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const found = employees.find(
      u => u.email === email && u.password === password,
      setLoading(false)
    )

    if (!found) {
        throw new Error('Invalid credentials')
    }

    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('auth_user', JSON.stringify(safeUser))

    setLoading(false);
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user')
  }

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
