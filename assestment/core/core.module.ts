import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

@Module({
  imports: [
    ConfigModule, // necessary for access ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // make sure ConfigService is available
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')!, // secure, not "undefined"
        signOptions: {
          expiresIn: configService.get<StringValue>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule],
})
export class CoreModule {}

// import JWT everyhwere without duplicate code.
