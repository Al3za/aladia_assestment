/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//Questo copre il bonus JWT-based login flow (parte 1)
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from 'config/jwt/jwt.config';
// import { CreateEmployeeDto } from 'common/dto/create-employee.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // here verifies the  jwt tokens
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // separate token from bearer
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
      // secretOrKey: process.env.JWT_SECRET || 'super-secret-key', // here it verify the token (jsonwebtoken.verify(token, secret));
    });
  }

  validate(payload: any) {
    // verify signature
    // here returns data we defined in jwt.sign()
    // quello che ritorni qui finisce in req.user
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
