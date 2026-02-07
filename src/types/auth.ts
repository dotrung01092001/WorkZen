import { type ID , type Role } from './common';

export interface AuthUser {
  id: ID;
  name: string;
  email: string;
  role: Role;
  password: string,
}

export interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
