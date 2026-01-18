import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'config/jwt/jwt.config';
// import { rateLimitModule } from './rateLimit/rate_limit';
// import { ThrottlerModule } from './rateLimit/rate_limit';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    // rateLimitModule,
  ], // import rateLimitModule int his file
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule], // send thise functions whenever it needs. JwtModule is the module.register defined abow
})
export class CoreModule {}

// import JWT everyhwere without duplicate code.
