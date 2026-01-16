import { Role } from 'generated/prisma/enums';
// import { Employee } from 'generated/prisma/browser';

export class EmployeeRto {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;

  static fromPrisma(employee: {
    id: number;
    name: string;
    email: string;
    role: Role;
    password: string;
  }): EmployeeRto {
    const rto = new EmployeeRto();
    rto.id = employee.id;
    rto.name = employee.name;
    rto.email = employee.email;
    rto.role = employee.role;
    rto.password = employee.password;
    return rto;
  }
}
