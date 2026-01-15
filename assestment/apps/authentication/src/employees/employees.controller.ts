import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
// import { UpdateEmployeeDto } from './dto/update-employee.dto';
//import { Prisma } from '@prisma/client'; // path where prisma is stored. (its used mainly for typization but we use  Dto and Rto for the assestment)
import { Role } from 'generated/prisma/enums';
// import { ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EmployeeRto } from './rto/employee.rto';

//@Controller('employees')
@Controller()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  //@Post()
  @MessagePattern({ cmd: 'create-employee' }) // Così il controller intercetta i messaggi TCP inviati dalla Gateway.
  create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeRto> {
    // @body doesnt exist in microservice. comunication are via TCP
    return this.employeesService.create(createEmployeeDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'get-employees' })
  findAll(payload: { role?: Role }): Promise<EmployeeRto[]> {
    console.log('📩 Payload received in microservice:', payload);
    return this.employeesService.findAll(payload.role);
  }

  // //@Get(':id')
  // @MessagePattern({ cmd: 'find-employee' })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.employeesService.findOne(id);
  // }

  // //@Patch(':id')
  // @MessagePattern({ cmd: 'update-employee' })
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(ValidationPipe)
  //   updateEmployeeDto: UpdateEmployeeDto,
  // ) {
  //   return this.employeesService.update(id, updateEmployeeDto);
  // }

  // //  @Delete(':id')
  // @MessagePattern({ cmd: 'delete-employee' })
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.employeesService.remove(id);
  // }
}
