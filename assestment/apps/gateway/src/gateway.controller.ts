import {
  Body,
  Catch,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmployeeDto } from '../../../common/dto/create-employee.dto';
import { LoginEmployeeDto } from 'common/dto/login-employee.dto';
import { Role } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { catchError } from 'rxjs';

@Controller('auth')
export class GatewayController {
  constructor(
    @Inject('AUTH_SERVICE') // microservice id defined in gateway.module
    private readonly authClient: ClientProxy,
  ) {}

  @Post('register')
  create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    // send message to microservice
    return this.authClient.send({ cmd: 'create-employee' }, createEmployeeDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new UnauthorizedException(err.message);
      }), // pattern and payload
    );
  }

  @Post('login')
  login(@Body(ValidationPipe) loginEmployeeDto: CreateEmployeeDto) {
    // send message to microservice
    return this.authClient.send({ cmd: 'login-employee' }, loginEmployeeDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new UnauthorizedException(err.message);
      }), // catch RpcException errors from microservices
    );
  }

  @UseGuards(JwtAuthGuard) // only logged-in user can access this route
  @Get('users')
  findAll(@Req() req: Request, @Query('role') role?: Role) {
    // const user = req.user as any;
    // console.log(user);
    console.log(req, 'check req');
    return this.authClient.send({ cmd: 'get-employees' }, { role });
  }
}
