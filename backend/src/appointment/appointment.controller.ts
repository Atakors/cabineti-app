import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req) {
    const userId = req.user.id;
    return this.appointmentService.create(createAppointmentDto, userId);
  }

  @Get()
  findAll(
    @Req() req,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.id;
    return this.appointmentService.findAll(userId, startDate, endDate);
  }
}