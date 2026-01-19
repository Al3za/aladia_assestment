import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from 'common/dto/create-employee.dto';
import { Role } from 'generated/prisma/enums';
import { EmployeeRto } from '../../../../common/rto/employee.rto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices'; // use this in microservices to throw errors
import { LoginEmployeeDto } from 'common/dto/login-employee.dto';

@Controller()
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly jwtService: JwtService, // secret_key and signOptions defined globaly in EmployeesModule
  ) {}

  //@Post()
  @MessagePattern({ cmd: 'create-employee' }) // get TCP messagges from Gateway.
  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeRto> {
    // @body doesnt exist in microservice. comunication are via TCP
    const create_emp = await this.employeesService.create(createEmployeeDto);
    if (!create_emp)
      throw new RpcException({
        statusCode: 404,
        message: `User email already exist`,
      });
    return EmployeeRto.fromPrisma(create_emp);
  }

  //@Post()
  @MessagePattern({ cmd: 'login-employee' })
  async login(dto: LoginEmployeeDto): Promise<object> {
    const employee = await this.employeesService.findByEmail(dto.email);
    if (!employee)
      throw new RpcException({
        statusCode: 404,
        message: `User not found with email: ${dto.email}`,
      });
    const match = await bcrypt.compare(dto.password, employee.password);
    if (!match)
      throw new RpcException({
        statusCode: 401,
        message: 'Wrong password, please try again',
      });

    const payload = { sub: employee.id, email: employee.email, role: employee.role }; // create the jwt token(do not insert password here)
    const token = this.jwtService.sign(payload); // we sign jwt with the help of jwtService module we installed.
    // secret_key and signOptions defined globaly in EmployeesModule.
    // we can sign smoothly with jwtService because in authentication.module.ts we import jwt configuration defined in core.module
    return { access_token: token }; // this token has to be stored in the request to enter the route 'users'
  }

  //@Get()
  @MessagePattern({ cmd: 'get-employees' })
  async findAll(payload: { role?: Role }): Promise<EmployeeRto[]> {
    // payload necessary to not have truble with tcp
    return await this.employeesService.findAll(payload.role);
  }
}
