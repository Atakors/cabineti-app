import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  time: Date;

  @IsString()
  @IsNotEmpty()
  patientId: string;
}