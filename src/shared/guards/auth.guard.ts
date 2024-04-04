import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';
import { UserRepository } from "src/users/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.get('Authorization');

    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized! Missing Token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.ACCESS_TOKEN_KEY})
      request.user = payload
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}

