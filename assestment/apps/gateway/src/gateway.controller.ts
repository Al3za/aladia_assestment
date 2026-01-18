import {
  Body,
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
import { Role } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { catchError } from 'rxjs';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { EmployeeRto } from 'common/rto/employee.rto';
import { LoginEmployeeDto } from 'common/dto/login-employee.dto';

@Controller('auth')
export class GatewayController {
  constructor(
    @Inject('AUTH_SERVICE') // connection with microservice by id name. (name defined in gateway.module)
    private readonly authClient: ClientProxy,
  ) {}

  @Post('register')
  @Throttle({
    auth: {}, // 5 requests / minute (for each user).
  })
  create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    // send message to microservice
    return this.authClient.send({ cmd: 'create-employee' }, createEmployeeDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new UnauthorizedException(err.message);
      }),
    );
  }

  @Post('login')
  @Throttle({
    auth: {},
  })
  login(@Body(ValidationPipe) loginEmployeeDto: LoginEmployeeDto) {
    // send message to microservice
    return this.authClient.send({ cmd: 'login-employee' }, loginEmployeeDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new UnauthorizedException(err.message);
      }), // catch RpcException errors from microservices
    );
  }

  @UseGuards(JwtAuthGuard) // only logged-in user can access this route. JwtAuthGuard is a extension of a jwt function defined in core/strategy, and works smoothly because we we imported CoreModule in app.module.ts, where those functions are defined)
  @Get('users') //  global rate limit applies here
  findAll(@Req() req: Request, @Query('role') role?: Role) {
    // const user = req.user as any;
    // console.log(req, 'check req');
    return this.authClient.send({ cmd: 'get-employees' }, { role });
  }

  // @SkipThrottle() no rate limit for this route
  // @Get('test')
  // health() {}
}
