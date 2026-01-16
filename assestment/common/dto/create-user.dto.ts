import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'; // gives an error if you don 't follow the rules (ex if you write a not formatted email)

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
