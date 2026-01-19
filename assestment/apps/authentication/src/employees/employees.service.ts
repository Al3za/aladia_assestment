/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../../config/database/database.service'; //'src/database/database.service'; //  here we talk to the database service
import { CreateEmployeeDto } from '../../../../common/dto/create-employee.dto';
// import { UpdateEmployeeDto } from 'common/dto/update-employee.dto';
import { Role } from 'generated/prisma/enums';
import { EmployeeRto } from '../../../../common/rto/employee.rto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices'; // use this in microservices to throw errors
import { findByEmailRto } from 'common/rto/findByEmail.rto';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {} // connecting to database service

  async create(dto: CreateEmployeeDto): Promise<EmployeeRto> {
    try {
      const hash_password = await bcrypt.hash(dto.password, 10);
      const employee = await this.databaseService.employee.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash_password,
          role: dto.role,
        },
      });
      return EmployeeRto.fromPrisma(employee);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // hapens when create a user with same email as one already registered
        throw new RpcException({ message: `user email already exist` });
      }
      throw new RpcException({ message: `${error})` });
    }
  }

  async findByEmail(email: string): Promise<findByEmailRto> {
    const employee = await this.databaseService.employee.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, role: true, password: true },
    });

    if (!employee) throw new RpcException({ message: `email: ${email} not found ` });

    return findByEmailRto.fromPrisma(employee);
  }

  async findAll(role?: Role): Promise<EmployeeRto[]> {
    const employees = await this.databaseService.employee.findMany({
      where: role ? { role: role } : undefined,
      select: { id: true, name: true, email: true, role: true },
    }); // in this case we dont need try catch

    return employees.map(EmployeeRto.fromPrisma);
  }
}
