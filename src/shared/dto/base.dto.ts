import { plainToClass } from "class-transformer";
import mongoose, { Document } from "mongoose";

export abstract class BaseDto {
  abstract _id: mongoose.Types.ObjectId
  abstract __v: number;

  static plainToClass<T extends BaseDto>(this: new (...args: any[]) => T, data: Document<Partial<T>>): T {
    return plainToClass(this, data.toObject());
  }
}