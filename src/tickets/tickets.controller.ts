import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('tickets')
@UseGuards(AuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post(':movieId')
  async create(
    @CurrentUser() user: UserDocument,
    @Param('movieId') movieId: string,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    console.log(createTicketDto);
    return await this.ticketsService.create(user, movieId, createTicketDto.seats);
  }

  @Get()
  findByUser(@CurrentUser() user: UserDocument) {
    return this.ticketsService.findByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
