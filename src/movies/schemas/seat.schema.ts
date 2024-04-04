import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export enum SeatType {
  NORMAL = 'normal',
  VIP = 'vip',
}

export enum SeatStatus {
  BOOKED = 'booked',
  EMPTY = 'empty',
  CANCEL = 'cancel'
}


@Schema({
  timestamps: true,
})
export class Seat {
  @Prop({ required: true })
  num: string;

  @Prop({
    default: SeatType.NORMAL,
    enum: [SeatType.NORMAL, SeatType.VIP],
  })
  type: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, enum: [SeatStatus.BOOKED, SeatStatus.CANCEL, SeatStatus.EMPTY] })
  status: SeatStatus;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
