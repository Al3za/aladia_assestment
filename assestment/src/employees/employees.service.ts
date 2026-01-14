/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { DatabaseService } from 'src/database/database.service'; //  here we talk to the database service

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {} // connecting to database service

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.databaseService.employee.create({
      // employee = schema/name (lower case)
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    // replace all this with DTO

    if (role)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return await this.databaseService.employee.findMany({
        where: {
          role,
        },
      });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.databaseService.employee.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.databaseService.employee.delete({
      where: { id },
    });
  }
}
console.log('EmployeesService loaded');
