import { CreateEmployeeDto } from './create-employee.dto';
import { PartialType } from '@nestjs/mapped-types'; //  npm i @nestjs/mapped-types -d

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {} // here we can chose data defined in CreateEmployeeDto without thorw an error.(ideal in update route)
