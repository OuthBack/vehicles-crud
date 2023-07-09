import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationType } from '~/decorators/pagination/pagination.decorator';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { VehiclesRepository } from '../respositories/vehicles.repository';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehicleRepository: VehiclesRepository) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicleExists = await this.vehicleRepository.count({
      plate: createVehicleDto.plate,
    });

    if (vehicleExists) {
      throw new BadRequestException('Vehicle already exists');
    }

    return this.vehicleRepository.create(createVehicleDto);
  }

  async findAll({ page, limit }: PaginationType) {
    const skip = (page - 1) * limit;
    return await this.vehicleRepository.findAll({ skip, take: limit });
  }

  async findOneByPlate(plate: string) {
    return this.vehicleRepository.findOneByPlate(plate);
  }

  async update(plate: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicleExists = await this.vehicleRepository.count({
      plate: updateVehicleDto.plate,
    });

    if (!vehicleExists) {
      throw new BadRequestException("Vehicle dosen't exists");
    }

    return this.vehicleRepository.update(plate, updateVehicleDto);
  }

  async delete(plate: string) {
    return this.vehicleRepository.delete(plate);
  }
}
