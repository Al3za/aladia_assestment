import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// 📌 what it does?

// stops the endpoint if token is invalid

// Use JwtStrategy by default

// 👉 JWT-based login flow (part 2)
