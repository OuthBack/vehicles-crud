import { Module } from '@nestjs/common';
import { VehiclesRepository } from './respositories/vehicles.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { VehiclesController } from './controllers/vehicles.controller';
import { VehiclesService } from './services/vehicles.service';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, VehiclesRepository],
  imports: [PrismaModule],
})
export class VehiclesModule {}
