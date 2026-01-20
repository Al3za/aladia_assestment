/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//Questo copre il bonus JWT-based login flow (parte 1)
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfigFactory } from 'config/jwt/jwt.config';
import { JwtValidatedUser } from 'common/interfaces/interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtConfig = jwtConfigFactory(configService); // call jwtConfigFactory function containing
    // full loaded secret value(.env.JWT_SECRET). ConfigService must be use even here for this operation
    // no error thrown related to process.env.JWT_SECRET = undefined, because as said before, ConfigService loads .env at run time and not at import time
    // "ConfigService make process.env values fully loaded at import-time"
    super({
      // here separate and verifies jwt tokens (jwt.verify(token))
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // separate token from bearer
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  validate(payload: any): JwtValidatedUser {
    // here returns data we defined in jwt.sign()
    // this data can you access in req.user in controllers
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}

// 📌 what id does?

// extract the token from Authorization: Bearer

// Verify signature + expire time

// Expose req.user

// JWT-based login flow (part 1)
