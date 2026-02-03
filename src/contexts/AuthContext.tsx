import { createContext, useState, type ReactNode } from 'react';
import { useEmployee } from './EmployeeContext';
import type { AuthUser } from '@/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { employees } = useEmployee();
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    const found = employees.find(
      u => u.email === email && u.password === password
    )

    if (!found) {
        throw new Error('Invalid credentials')
    }

    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('auth_user', JSON.stringify(safeUser))
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
