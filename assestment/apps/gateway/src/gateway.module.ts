import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
//import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CoreModule } from 'core/core.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'; // implement rate limit
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      // rate limit middleware
      throttlers: [
        {
          name: 'default',
          ttl: 60,
          limit: 10,
        },
        {
          name: 'auth',
          ttl: 60,
          limit: 5,
        },
      ],
    }),
    CoreModule, // for jwt(guards, strategies)
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001, // same port as the microservice
        },
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD, // Guard is executed GLOBALY on all routes before http hits controller endpoin. Otherwise we should use @UseGuards() on all endpoint
      useClass: ThrottlerGuard, // ThrottlerGuard is the rate limit engine. it checks IP adress, enpoints, number of request. If we go behind what the limit it stops the request with 429 error
    },
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}

// AUTH_SERVICE è solo un token DI, non il nome del microservizio.

// run  nest start gateway --watch to open gateway connection ( it opens tnx to nest-cli.json file)

// after you open the gateway servers, run postman test at http://localhost:3000/auth/users , not 3001. (main.ts listens at port 3000)
