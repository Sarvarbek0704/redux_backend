import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsNumber()
  @IsOptional()
  flightId?: number;
}
