import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDocument, User } from '../schemas/user.schema';
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async createUser(user: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async updateProfile(id: string, data: Partial<User>): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
