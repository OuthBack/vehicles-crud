import { type VehicleEntity } from '~/entities/vehicle.entity';
import {
  VehicleAlreadyExistsError,
  VehicleNotFoundError,
} from '~/errors/vehicle.error';
import { vehicleRepository } from '~/repositories/vehicle.repository';

type ListVehiclesArgs = {
  page: number;
  limit: number;
};

type GetVehicleArgs = {
  plate: string;
};

type UpdateVehicleArgs = Omit<Partial<VehicleEntity>, 'id'> &
  Required<Pick<VehicleEntity, 'plate'>>;

type DeleteArgs = {
  plate: string;
};

export const vehicleService = {
  async getVehicleByPlate({ plate }: GetVehicleArgs) {
    return await vehicleRepository.findOneByPlate({ plate });
  },

  async listVehicles({ limit, page }: ListVehiclesArgs) {
    const skip = (page - 1) * limit;
    const vehicleAmount = await vehicleRepository.count();

    const vehicles = await vehicleRepository.findAll({
      skip,
      take: limit,
    });

    return {
      vehicles,
      page,
      limit,
      totalItems: vehicleAmount,
      totalPages: Math.ceil(vehicleAmount / limit),
    };
  },

  async createVehicle(vehicle: Omit<VehicleEntity, 'id'>) {
    const uniqueExists = async (
      unique: Parameters<typeof vehicleRepository.findOneByUnique>[0],
    ) => {
      const vehicleExists = await vehicleRepository.findOneByUnique(unique);

      if (vehicleExists) {
        throw new VehicleAlreadyExistsError();
      }
    };

    await uniqueExists({ plate: vehicle.plate });
    await uniqueExists({ chassis: vehicle.chassis });

    return await vehicleRepository.create(vehicle);
  },

  async updateVehicleByPlate(vehicle: UpdateVehicleArgs) {
    const vehicleExists = await vehicleRepository.findOneByPlate({
      plate: vehicle.plate,
    });

    if (!vehicleExists) {
      throw new VehicleNotFoundError();
    }

    return await vehicleRepository.updateByPlate(vehicle);
  },

  async deleteVehicleByPlate({ plate }: DeleteArgs) {
    const vehicleExists = await vehicleRepository.findOneByPlate({ plate });

    if (!vehicleExists) {
      throw new VehicleNotFoundError();
    }

    return await vehicleRepository.deleteByPlate({ plate });
  },
};
