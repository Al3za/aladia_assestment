import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { StringValue } from 'ms';
import { AppConfigModule } from 'config/app-config.module';
import { JwtConfigModule } from 'config/jwt/jwt.module';

@Module({
  imports: [AppConfigModule, JwtConfigModule],
  providers: [JwtStrategy], // JwtStrategy is for  verify (jwt.verify(token))
  exports: [JwtStrategy, JwtModule], // JwtModule = the one we registered ( JwtModule.registerAsync)
  // JwtStrategy (for jwt.verify(token))
  // JwtModule = the one we registered ( JwtModule.registerAsync), for jwt.sign() only
})
export class CoreModule {}

// import JWT everyhwere without duplicate code.
