import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  generateHashPassword,
  validatePassword,
} from 'src/shared/utils/password';
import { CreateUserDto } from './dto/create-user.dto';
import { generateToken } from 'src/shared/utils/jwt-token';
import { LoginDto } from './dto/login.dto';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRepository } from './repositories/user.repository';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.createUser(createUserDto)
      return UserResponseDto.plainToClass(user)
    } catch (error) {
      throw error
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (!user) {
        throw new NotFoundException('Email not found')
      }
      return user
    } catch (error) {
      throw error
    }
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  }

  async getProfile(userId: string): Promise<UserResponseDto> {
    const profile = (await this.userRepository.findById(userId));
    if (!profile) {
      throw new NotFoundException('User profile not found');
    }
    return UserResponseDto.plainToClass(profile)
  }

  async updateProfile(
    userId: string,
    body: Partial<User>,
  ): Promise<UserResponseDto> {
    const profile = await this.userRepository.findById(userId);
    if (!profile) {
      throw new NotFoundException('User profile not found');
    }
    const updatedProfile = await this.userRepository.updateProfile(
      userId,
      body,
    );
    return UserResponseDto.plainToClass(profile)
  }
}
