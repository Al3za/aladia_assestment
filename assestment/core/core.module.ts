import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { rateLimitModule } from './rateLimit/rate_limit';
// import { jwtConfig } from 'config/jwt/jwt.config';

@Module({
  imports: [rateLimitModule], // import rateLimitModule int his file
  providers: [JwtStrategy],
  exports: [JwtStrategy, rateLimitModule], // send thise functions whenever it needs
})
export class CoreModule {}

// import JWT everyhwere without duplicate code.
