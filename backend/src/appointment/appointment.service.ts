import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  create(createAppointmentDto: CreateAppointmentDto, userId: string) {
    return this.prisma.appointment.create({
      data: {
        time: createAppointmentDto.time,
        patientId: createAppointmentDto.patientId,
        doctorId: userId,
      },
    });
  }

  findAll(userId: string, startDate?: string, endDate?: string) {
    return this.prisma.appointment.findMany({
      where: {
        doctorId: userId,
        ...(startDate && endDate && {
          time: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
      },
      include: {
        patient: {
          select: {
            fullName: true,
          },
        },
      },
      orderBy: {
        time: 'asc',
      },
    });
  }
}