import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class CoreModule {}

// import JWT everyhwere without duplicate code.
