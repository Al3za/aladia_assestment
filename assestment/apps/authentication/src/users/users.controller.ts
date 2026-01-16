import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe, // make it possible to use the class-validator
} from '@nestjs/common';
import { UsersService } from './users.service'; // need this import to interact controller with services
import { CreateUserDto } from '../../../../common/dto/create-user.dto';
import { UpdateUserDto } from 'common/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {} // create the class instance

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe transform string to number. if now we enter a string in url, we ll get 400 Bad Request(before there was no error)
    return this.userService.findOne(id);
  }

  @Post() // Post users
  create(
    @Body(ValidationPipe) // make it possible to use the class-validator
    createUserDto: CreateUserDto, // CTO
  ) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id') // patch /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id') // delete /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
