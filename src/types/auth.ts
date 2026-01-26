import { type ID , type Role } from './common';

export interface AuthUser {
  id: ID;
  name: string;
  role: Role;
}

export interface AuthContextValue {
  user: AuthUser | null;
  loginAs: (role: Role) => void;
  logout: () => void;
}
