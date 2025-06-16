import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateConsultationDto {
  @IsString()
  @IsNotEmpty()
  symptoms: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  treatment: string;

  @IsNumber()
  @IsPositive()
  fee: number;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  appointmentId: string;
}