import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export abstract class PlateDto {
  @ApiProperty()
  @MaxLength(30)
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/)
  @IsString()
  plate: string;
}

export class VehicleDto extends PlateDto {
  @ApiProperty()
  @MaxLength(30)
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty()
  @MaxLength(30)
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ minimum: 1886 })
  @Min(1886)
  @IsNumber()
  year: number;
}
