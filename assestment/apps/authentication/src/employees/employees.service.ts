import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service'; //'src/database/database.service'; //  here we talk to the database service
import { CreateEmployeeDto } from '../../../../common/dto/create-employee.dto';
// import { UpdateEmployeeDto } from 'common/dto/update-employee.dto';
import { Role } from 'generated/prisma/enums';
import { EmployeeRto } from '../../../../common/rto/employee.rto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices'; // use this in microservices to throw errors

//import { Prisma } from '@prisma/client'; can be also used as DTO

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
        //throw new ConflictException('Employee already exists');
      }

      throw new RpcException({ message: `${error})` });
      //error;
    }
  }

  async findByEmail(email: string): Promise<EmployeeRto> {
    const employee = await this.databaseService.employee.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, role: true, password: true },
    });

    if (!employee) throw new RpcException({ message: `user mot found with email ${email}` }); //new NotFoundException(`user not found by email: ${email}`);

    return EmployeeRto.fromPrisma(employee);
  }

  async findAll(role?: Role): Promise<EmployeeRto[]> {
    const employees = await this.databaseService.employee.findMany({
      where: role ? { role: role } : undefined,
      select: { id: true, name: true, email: true, role: true },
    }); // in this case we dont need try catch
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return employees.map(EmployeeRto.fromPrisma);
  }

  // async findOne(id: number): Promise<EmployeeRto> {
  //   try {
  //     const employee = await this.databaseService.employee.findUnique({
  //       where: { id },
  //       select: { name: true, email: true, roles: true },
  //     });

  //     if (!employee) throw new NotFoundException('User Not Found'); //return null;
  //     return EmployeeRto.fromPrisma(employee); // RTO
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (error.code === 'P2025') {
  //         // error throwed if user not found
  //         throw new NotFoundException('Employee not found');
  //       }
  //     }
  //     throw error;
  //   }
  // }

  // async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeRto> {
  //   try {
  //     const Employee = await this.databaseService.employee.update({
  //       where: { id },
  //       data: updateEmployeeDto,
  //     });

  //     return EmployeeRto.fromPrisma(Employee);
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (error.code === 'P2025') {
  //         // error throwed if user not found
  //         throw new NotFoundException('Employee not found');
  //       }
  //     }
  //     throw error; // error throwed if something else within the DB fails
  //   }
  // }

  // async remove(id: number) {
  //   try {
  //     return await this.databaseService.employee.delete({
  //       where: { id },
  //     });
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (error.code === 'P2025') {
  //         // error throwed if user not found
  //         throw new NotFoundException('Employee not found');
  //       }
  //     }
  //     throw error;
  //   }
  // }
}
