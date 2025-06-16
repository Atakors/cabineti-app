import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  create(createPatientDto: CreatePatientDto, userId: string) {
    return this.prisma.patient.create({
      data: {
        ...createPatientDto,
        ownerId: userId,
      },
    });
  }

  findAll(userId: string, search?: string) {
    return this.prisma.patient.findMany({
      where: {
        ownerId: userId,
        ...(search && {
          fullName: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient || patient.ownerId !== userId) {
      throw new ForbiddenException("Access to this patient's record is denied");
    }
    return patient;
  }
}