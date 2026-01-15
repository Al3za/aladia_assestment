// import { CreateUserDto } from './create-user.dto';
import { CreateEmployeeDto } from './create-employee.dto.js';
import { PartialType } from '@nestjs/mapped-types'; //  npm i @nestjs/mapped-types -d

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
