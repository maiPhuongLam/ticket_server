import { Exclude, plainToClass } from 'class-transformer';
import mongoose from 'mongoose';
import { BaseDto } from 'src/shared/dto/base.dto';

export class UserResponseDto extends BaseDto {
  _id: mongoose.Types.ObjectId;
  email: string;
  fullname: string;
  phone: string;
  @Exclude()
  password: string;
  age: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  @Exclude()
  __v: number;
}
