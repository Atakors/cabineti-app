import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;
}