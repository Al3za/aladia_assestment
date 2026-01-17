import { Module } from '@nestjs/common';
import { CoreModule } from 'core/core.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'; // implement rate limit
import { APP_GUARD } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      // rate limit middleware
      { name: 'default', ttl: 60_000, limit: 10 },
      { name: 'auth', ttl: 60_000, limit: 1 },
    ]),
    GatewayModule,
    CoreModule, // for jwt(guards, strategies)
  ],
  providers: [
    {
      provide: APP_GUARD, // Guard is executed GLOBALY on all routes before http hits controller endpoin. Otherwise we should use @UseGuards() on all endpoint
      useClass: ThrottlerGuard, // ThrottlerGuard is the rate limit engine. it checks IP adress, enpoints, number of request. If we go behind what the limit it stops the request with 429 error
    },
  ],
})
export class AppModule {}

// AUTH_SERVICE è solo un token DI, non il nome del microservizio.

// run  nest start gateway --watch to open gateway connection ( it opens tnx to nest-cli.json file)

// after you open the gateway servers, run postman test at http://localhost:3000/auth/users , not 3001. (main.ts listens at port 3000)
