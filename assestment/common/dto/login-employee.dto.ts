import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'; // gives an error if you don 't follow the rules (ex if you write a not formatted email)

export class LoginEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
