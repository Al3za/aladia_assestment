import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service'; //'src/database/database.service'; //  here we talk to the database service
import { CreateEmployeeDto } from 'common/dto/create-employee.dto';
// import { UpdateEmployeeDto } from 'common/dto/update-employee.dto';
import { Role } from 'generated/prisma/enums';
import { EmployeeRto } from '../../../../common/rto/employee.rto';
import { Prisma } from '@prisma/client';
//import { Prisma } from '@prisma/client'; can be used as DTO

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {} // connecting to database service

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeRto> {
    try {
      const employee = await this.databaseService.employee.create({
        data: createEmployeeDto,
      });

      return EmployeeRto.fromPrisma(employee);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // if we enter a user with same email as one already registered
        throw new ConflictException('Employee already exists');
      }

      throw error;
    }
  }

  async findAll(role?: Role): Promise<EmployeeRto[]> {
    const employees = await this.databaseService.employee.findMany({
      where: role ? { roles: role } : undefined,
      select: { name: true, email: true, roles: true },
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
