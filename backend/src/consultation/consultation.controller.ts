import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/consultations')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  create(@Body() createConsultationDto: CreateConsultationDto, @Req() req) {
    const userId = req.user.id;
    return this.consultationService.create(createConsultationDto, userId);
  }

  @Get('patient/:patientId')
  findAllForPatient(@Param('patientId') patientId: string, @Req() req) {
    const userId = req.user.id;
    return this.consultationService.findAllForPatient(patientId, userId);
  }
}