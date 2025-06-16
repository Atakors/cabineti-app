import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@Injectable()
export class ConsultationService {
  constructor(private prisma: PrismaService) {}

  async create(createConsultationDto: CreateConsultationDto, userId: string) {
    // Verify the user owns the patient record before creating a note
    const patient = await this.prisma.patient.findUnique({
      where: { id: createConsultationDto.patientId },
    });
    if (!patient || patient.ownerId !== userId) {
      throw new ForbiddenException('Cannot create consultation for this patient.');
    }

    return this.prisma.consultationNote.create({
      data: {
        ...createConsultationDto,
      },
    });
  }

  async findAllForPatient(patientId: string, userId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient || patient.ownerId !== userId) {
      throw new ForbiddenException("Access to this patient's records is denied.");
    }

    return this.prisma.consultationNote.findMany({
      where: { patientId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}