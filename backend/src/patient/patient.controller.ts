import { Controller, Get, Post, Body, Query, UseGuards, Req, Param } from '@nestjs/common';
import { PatientService } from './patient.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePatientDto } from './dto/create-patient.dto';

@UseGuards(AuthGuard('jwt')) // All routes in this controller are protected
@Controller('api/patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto, @Req() req) {
    const userId = req.user.id;
    return this.patientService.create(createPatientDto, userId);
  }

  @Get()
  findAll(@Req() req, @Query('search') search: string) {
    const userId = req.user.id;
    return this.patientService.findAll(userId, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.patientService.findOne(id, userId);
  }
}