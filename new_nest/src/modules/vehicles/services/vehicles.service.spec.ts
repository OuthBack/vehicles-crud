import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import {
  VehiclesRepositoryMock,
  vehicleMock,
} from '../respositories/mocks/vehicles.repository.mock';
import { BadRequestException } from '@nestjs/common';
import { VehiclesRepository } from '../respositories/vehicles.repository';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let repository: VehiclesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: VehiclesRepository,
          useValue: VehiclesRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    repository = module.get<VehiclesRepository>(VehiclesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('CreateVehicle', () => {
    beforeAll(() => {
      jest.spyOn(repository, 'count').mockResolvedValue(0);
    });

    it('should create a vehicle', async () => {
      const vehicle = {
        plate: 'ABC-1234',
        brand: 'Fiat',
        model: 'Uno',
        year: 2020,
      };
      const expected = await service.create(vehicle);

      expect(expected).toEqual({ id: 1, ...vehicle });
    });

    describe('If a vehicle with the same plate already exists', () => {
      it('should throw a BadRequestException', async () => {
        try {
          await service.create({
            plate: 'ABC-1234',
            brand: 'Fiat',
            model: 'Uno',
            year: 2020,
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });

  describe('FindAllVehicles', () => {
    it('should find all vehicles', async () => {
      const expected = await service.findAll({ page: 1, limit: 10 });
      expect(expected).toEqual([vehicleMock]);
    });
  });

  describe('FindOneVehicle', () => {
    it('should find one vehicle', async () => {
      const expected = await service.findOneByPlate('1');
      expect(expected).toEqual(vehicleMock);
    });
  });

  describe('UpdateVehicle', () => {
    beforeAll(() => {
      jest.spyOn(repository, 'count').mockResolvedValue(1);
    });

    it('should update a vehicle', async () => {
      const expected = await service.update('1', {
        plate: 'ABC-1234',
        brand: 'Fiat',
        model: 'Uno',
        year: 2020,
      });

      expect(expected).toEqual(vehicleMock);
    });

    describe("If a vehicle with the same plate doesen't already exists", () => {
      beforeAll(() => {
        jest.spyOn(repository, 'count').mockResolvedValue(0);
      });

      it('should throw a BadRequestException', async () => {
        try {
          await service.update('1', {
            plate: 'ABC-1234',
            brand: 'Fiat',
            model: 'Uno',
            year: 2020,
          });
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });

  describe('DeleteVehicle', () => {
    it('should delete a vehicle', async () => {
      const expected = await service.delete('1');
      expect(expected).toEqual(vehicleMock);
    });
  });
});
