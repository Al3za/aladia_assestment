import { Body, Controller, Get, Inject, Post, Query, ValidationPipe } from '@nestjs/common';
//import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Role } from '@prisma/client';
// import { EmployeeRto } from 'apps/authentication/src/employees/rto/employee.rto'; no need RTO in gateway

@Controller('auth')
export class GatewayController {
  constructor(
    @Inject('AUTH_SERVICE') // the microservice defined in gateway.module
    private readonly authClient: ClientProxy,
  ) {}

  @Post('register')
  create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    // send message to microservice
    return this.authClient.send({ cmd: 'create-employee' }, createEmployeeDto); // pattern and payload
  }

  @Get('users')
  findAll(@Query('role') role?: Role) {
    return this.authClient.send({ cmd: 'get-employees' }, { role });
  }
}
