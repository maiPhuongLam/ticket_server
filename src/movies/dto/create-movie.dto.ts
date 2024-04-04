import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsArray()
  genre: string[];

  @IsNotEmpty()
  timeStart: Date;

  @IsNotEmpty()
  timeEnd: Date;

  // @IsNotEmpty()
  // @IsNumber()
  // seatsNum: number;

  @IsNotEmpty()
  @IsString()
  theater: string;

  @IsNotEmpty()
  @IsNumber()
  normalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  vipPrice: number;

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
