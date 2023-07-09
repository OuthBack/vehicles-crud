import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/modules/prisma/prisma.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { VehicleDto } from '../dto/vehicle.dto';

@Injectable()
export class VehiclesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return await this.prisma.vehicle.create({ data: createVehicleDto });
  }

  async count(vehicle: Partial<VehicleDto>) {
    return await this.prisma.vehicle.count({ where: vehicle });
  }

  async findOneByPlate(plate: string) {
    return await this.prisma.vehicle.findUnique({
      where: {
        plate,
      },
    });
  }

  async findAll({ skip, take }) {
    return await this.prisma.vehicle.findMany({
      skip,
      take,
    });
  }

  async update(plate: string, vehicle: Partial<VehicleDto>) {
    return await this.prisma.vehicle.update({
      where: {
        plate,
      },
      data: vehicle,
    });
  }

  async delete(plate: string) {
    return await this.prisma.vehicle.delete({
      where: {
        plate,
      },
    });
  }
}
