import { Role } from 'generated/prisma/enums';
// import { Employee } from 'generated/prisma/browser';

export class EmployeeRto {
  // id: number;
  name: string;
  email: string;
  roles: Role;

  static fromPrisma(employee: {
    // id: number;
    name: string;
    email: string;
    roles: Role;
  }): EmployeeRto {
    const rto = new EmployeeRto();
    // rto.id = employee.id;
    rto.name = employee.name;
    rto.email = employee.email;
    rto.roles = employee.roles;
    return rto;
  }
}
