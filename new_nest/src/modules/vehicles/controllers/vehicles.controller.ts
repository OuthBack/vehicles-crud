import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  Pagination,
  PaginationType,
} from '~/decorators/pagination/pagination.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehiclesService } from '../services/vehicles.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { FindOneByPlateDto } from '../dto/find-one-by-plate.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { DeleteVehicleDto } from '../dto/delete-vehicle.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The vehicle has been successfully created.',
  })
  @ApiBody({ type: CreateVehicleDto })
  create(@Body() vehicle: CreateVehicleDto) {
    return this.vehiclesService.create(vehicle);
  }

  @ApiResponse({
    status: 200,
    description: 'The vehicles have been found.',
  })
  @ApiBody({ type: PaginationType })
  @Get()
  findAll(@Pagination() pagination: PaginationType) {
    return this.vehiclesService.findAll(pagination);
  }

  @ApiResponse({
    status: 200,
    description: 'The vehicle has been successfully found.',
  })
  @ApiBody({ type: FindOneByPlateDto })
  @Get(':plate')
  findOne(@Param() { plate }: FindOneByPlateDto) {
    return this.vehiclesService.findOneByPlate(plate);
  }

  @ApiResponse({
    status: 200,
    description: 'The vehicle has been successfully edited.',
  })
  @ApiBody({ type: UpdateVehicleDto })
  @Patch(':plate')
  update(
    @Param('plate') plate: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehiclesService.update(plate, updateVehicleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The vehicle has been successfully deleted.',
  })
  @ApiBody({ type: DeleteVehicleDto })
  @Delete(':plate')
  remove(@Param('plate') plate: string) {
    return this.vehiclesService.delete(plate);
  }
}
