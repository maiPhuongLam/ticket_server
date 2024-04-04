import { IsNotEmpty, IsString, IsArray, IsNumber } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsArray()
  setVipSeats: string[];

  @IsArray()
  setCancelSeats: string[];

  @IsNotEmpty()
  @IsNumber()
  rowNum: number;

  @IsNotEmpty()
  @IsNumber()
  colNum: number;
}
