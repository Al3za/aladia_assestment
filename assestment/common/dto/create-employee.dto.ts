import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'; // gives an error if you don 't follow the rules (ex if you write a not formatted email)
import { Role } from 'generated/prisma/enums'; // it create a reference to the schema role so if role change on schema it ll refears automatically on this role here, without adding new roles manually in this file

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  // @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
  //   message: 'Valid role required',
  // })
  // role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  @IsEnum(Role, { message: 'Valid role required' })
  role: Role;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  // @Matches(/[A-Z]/)
  // @Matches(/[0-9]/)
  password: string;
}
