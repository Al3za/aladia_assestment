import { Module } from '@nestjs/common';
import { CoreModule } from 'core/core.module';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'; // implement rate limit
// import { APP_GUARD } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { rateLimitModule } from 'core/rateLimit/rate_limit';

@Module({
  imports: [
    GatewayModule,
    CoreModule, // in core.module imports are defined jwt functions(guards, strategies, for token validation) and ratelimit. Those functions are used in controllers, and exported in core.module
    rateLimitModule,
  ],
})
export class AppModule {}

// AUTH_SERVICE è solo un token DI, non il nome del microservizio.

// run  nest start gateway --watch to open gateway connection ( it opens tnx to nest-cli.json file)

// after you open the gateway servers, run postman test at http://localhost:3000/auth/users , not 3001. (main.ts listens at port 3000)
