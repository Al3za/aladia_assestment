import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConfig } from 'config/jwt/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
// import { ConfigService } from '@nestjs/config';

// import { rateLimitModule } from './rateLimit/rate_limit';
// import { ThrottlerModule } from './rateLimit/rate_limit';

// @Module({
//   imports: [
//     JwtModule.register({
//       secret: jwtConfig.secret,
//       signOptions: { expiresIn: jwtConfig.expiresIn },
//     }),
//   ],
//   providers: [JwtStrategy],
//   exports: [JwtStrategy, JwtModule], // send thise functions whenever it needs. JwtModule is the module.register defined abow
// })
// export class CoreModule {}

@Module({
  imports: [
    ConfigModule, // necessario per avere ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // assicura che ConfigService sia disponibile
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')!, // sicuro, non undefined
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
