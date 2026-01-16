import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from 'common/dto/create-employee.dto';
import { Role } from 'generated/prisma/enums';
// import { ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EmployeeRto } from '../../../../common/rto/employee.rto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

//@Controller('employees')
@Controller()
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly jwtService: JwtService, // secret_key and signOptions defined globaly in EmployeesModule
  ) {}

  //@Post()
  @MessagePattern({ cmd: 'create-employee' }) // Così il controller intercetta i messaggi TCP inviati dalla Gateway.
  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeRto> {
    console.log('MessagePattern create hit');
    // @body doesnt exist in microservice. comunication are via TCP
    return await this.employeesService.create(createEmployeeDto);
  }

  //@Post()
  @MessagePattern({ cmd: 'login-employee' })
  async login(Dto: CreateEmployeeDto) {
    console.log('MessagePattern login hit');
    console.log(Dto, 'here');
    // payload necessary to not have truble with tcp
    const employee = await this.employeesService.findByEmail(Dto.email);
    if (!employee) throw new NotFoundException(`user not found with email:${Dto.email}`);

    const match = await bcrypt.compare(Dto.password, employee.password);
    if (!match) throw new NotFoundException('Wrong password');

    const payload = { sub: employee.id, email: employee.email, role: employee.role }; // create the jwt token(do not insert password here)
    const token = this.jwtService.sign(payload); // we sign jwt with the help of jwtService module we installed.
    // secret_key and signOptions defined globaly in EmployeesModule
    return { access_token: token }; // this token has to be stored in the request to enter the route 'users'
  }

  //@Get()
  @MessagePattern({ cmd: 'get-employees' })
  async findAll(payload: { role?: Role }): Promise<EmployeeRto[]> {
    console.log('Payload received in microservice:', payload);
    // payload necessary to not have truble with tcp
    return await this.employeesService.findAll(payload.role);
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
