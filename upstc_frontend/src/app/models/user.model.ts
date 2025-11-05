export type Role = 'ADMIN' | 'PROJECT_MANAGER' | 'ENGINEER' | 'AUDITOR' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  token?: string;
}
