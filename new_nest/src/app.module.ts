import { Module } from '@nestjs/common';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [VehiclesModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
