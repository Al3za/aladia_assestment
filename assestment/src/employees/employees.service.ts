/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
// import { Prisma } from 'generated/prisma/browser';
import { DatabaseService } from '../database/database.service.js'; //'src/database/database.service.js'; //  here we talk to the database service
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { Role } from 'generated/prisma/enums.js';
import { EmployeeRto } from './rto/employee.rto.js';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {} // connecting to database service

  async create(createEmployeeDto: CreateEmployeeDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.databaseService.employee.create({
      // employee = schema/name (lower case)
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Role /*'INTERN' | 'ENGINEER' | 'ADMIN'*/) {
    // replace all this with DTO

    if (role)
      return await this.databaseService.employee.findMany({
        where: {
          roles: role,
        },
      });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.databaseService.employee.findMany();
  }

  async findOne(id: number): Promise<EmployeeRto | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const employee = await this.databaseService.employee.findUnique({
      where: { id },
      select: { name: true, email: true, roles: true },
    });

    if (!employee) return null;

    return EmployeeRto.fromPrisma(employee);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
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
//console.log('EmployeesService loaded');
