import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

export const JwtConfigModule = JwtModule.registerAsync({
  // JwtModule.registerAsync is necessary for JwtService =( jwt.sign(token) )
  inject: [ConfigService], // when execute useFactory, load and inject a istance of ConfigService,
  // that will make it sure that configService.get.JWT_SECRET will not be undefined
  useFactory: (configService: ConfigService) => ({
    // useFactory is  executed at runtime, after bootstrap
    secret: configService.get<string>('JWT_SECRET')!, // secure value loaded att import time(not 'undefined'), tnx to ConfigService
    signOptions: {
      expiresIn: configService.get<StringValue>('JWT_EXPIRES_IN') || '1h',
    },
  }),
});
