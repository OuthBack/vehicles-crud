import { VehicleEntity } from '../../entities/vehicles.entity';
import { VehiclesRepository } from '../vehicles.repository';

export const vehicleMock: VehicleEntity = {
  id: 1,
  plate: 'ABC-1234',
  brand: 'Fiat',
  model: 'Uno',
  year: 2020,
};

type VehicleRepositoryMockType = Omit<VehiclesRepository, 'prisma'>;

export const VehiclesRepositoryMock: VehicleRepositoryMockType = {
  create: jest.fn().mockResolvedValue(vehicleMock),
  findAll: jest.fn().mockResolvedValue([vehicleMock]),
  findOneByPlate: jest.fn().mockResolvedValue(vehicleMock),
  update: jest.fn().mockResolvedValue(vehicleMock),
  delete: jest.fn().mockResolvedValue(vehicleMock),
  count: jest.fn().mockResolvedValue(1),
};
