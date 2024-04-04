import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: [UserRole.CUSTOMER, UserRole.ADMIN] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
