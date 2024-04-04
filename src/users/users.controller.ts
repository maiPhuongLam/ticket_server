import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './schemas/user.schema';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: UserDocument) {
    return await this.usersService.getProfile(user._id.toString());
  }

  @Patch('profile/:id')
  async updateProfile(
    @Param('id') userId: string,
    @Body() data: Partial<User>,
  ) {
    return await this.usersService.updateProfile(userId, data);
  }
}
