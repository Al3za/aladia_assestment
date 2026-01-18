import { Role } from 'generated/prisma/client';

export interface JwtValidatedUser {
  userId: number;
  email: string;
  role: Role;
}
