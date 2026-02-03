import { type ID, type Role, type Status } from './common';

export interface Employee {
  id: ID;
  name: string;
  email: string;
  role: Role;
  status: Status;
  password: string;
}

export interface CreateEmployeePayload {
  name: string;
  email: string;
  role: Role;
  status: Status;
}
