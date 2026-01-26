import { type ID, type Role, type Status } from './common';

export interface Employee {
  id: ID;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joinedAt: string; // ISO date
}

export interface CreateEmployeePayload {
  name: string;
  email: string;
  role: Role;
  status: Status;
}
