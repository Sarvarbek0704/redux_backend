import { IsString, IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;

  @IsString()
  @IsNotEmpty()
  flightCompany: string;
}
