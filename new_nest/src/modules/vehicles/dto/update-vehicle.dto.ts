import { PartialType } from '@nestjs/swagger';
import { VehicleDto } from './vehicle.dto';

export class UpdateVehicleDto extends PartialType(VehicleDto) {}
