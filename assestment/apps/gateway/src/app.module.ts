import { Module } from '@nestjs/common';
import { CoreModule } from 'core/core.module';
import { GatewayModule } from './gateway.module';
import { rateLimitModule } from 'core/rateLimit/rate_limit';

@Module({
  imports: [
    GatewayModule,
    CoreModule, // in core.module imports are defined jwt functions like guards, strategies, for token validation. Those functions are then used in controllers to "verfy(token)"
    rateLimitModule,
  ],
})
export class AppModule {}

// AUTH_SERVICE its a token id, not microservice name.

// run  nest start gateway --watch to open gateway connection ( it opens tnx to nest-cli.json file)

// after you open the gateway servers, run postman test at http://localhost:3000/auth/users , not 3001. (main.ts listens at port 3000)
