export type UserRole = 'CLIENT' | 'ADMIN' | 'FULL_ADMIN';

export interface AuthenticatedUser {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  billingAddress: string;
  role: UserRole;
}

export interface UserAdminView {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  active: boolean;
  locked: boolean;
}
