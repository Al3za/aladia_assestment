import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { rateLimitModule } from './rateLimit/rate_limit';

@Module({
  imports: [rateLimitModule], // import rateLimitModule inthis file
  providers: [JwtStrategy],
  exports: [JwtStrategy, rateLimitModule], // send thise functions whenever it needs
})
export class CoreModule {}

// import JWT everyhwere without duplicate code.
