import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from 'src/users/repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { generateHashPassword, validatePassword } from 'src/shared/utils/password';
import { generateToken } from 'src/shared/utils/jwt-token';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}
  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email)

    const isPasswordEqual = await validatePassword(password, user.password);
    if (!isPasswordEqual) {
      throw new BadRequestException('Password is incorrect');
    }

    const _id = user._id.toString();
    const accessToken = await this.jwtService.signAsync({ _id, role: user.role }, { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '1h'});
    const refreshToken = await this.jwtService.signAsync({ _id, role: user.role }, { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '7d'});
    return { accessToken, refreshToken };
  }

  async register(registerDto: RegisterDto): Promise<UserResponseDto> {
    const { email, fullname, password, phone, age, role } = registerDto;
    const userExist = await this.usersService.checkIfEmailExists(email);
    if (userExist) {
      throw new ConflictException()
    }    
    const passwordHashed = await generateHashPassword(password);
    const user = (
      await this.usersService.create({
        email,
        fullname,
        password: passwordHashed,
        phone,
        age,
        role,
      })
    )
    return user
  }
}
