// import {
//   Inject,
//   Injectable,
//   NestMiddleware,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Request, NextFunction, Response } from 'express';
// import { UserRepository } from 'src/users/repositories/user.repository';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private userRepository: UserRepository) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     try {
//       const authHeader = req.get('Authorization');
//       if (!authHeader) {
//         throw new UnauthorizedException('Unauthorized! Missing Token');
//       }
//       const token = authHeader.split(' ')[1];
//       let decoded;
//       console.log(process.env.ACCESS_TOKEN_KEY);

//       try {
//         decoded = (await jwt.verify(
//           token,
//           process.env.ACCESS_TOKEN_KEY,
//         )) as jwt.JwtPayload;
//       } catch (error) {
//         throw new UnauthorizedException('Invalid token');
//       }
//       const user = await this.userRepository.findById(decoded._id);
//       if (!user) {
//         throw new UnauthorizedException('Unauthorized! User not Exists');
//       }
//       delete user.password;
//       req.user = user;
//       next();
//     } catch (error) {
//       throw error;
//     }
//   }
// }
