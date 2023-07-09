import { prisma } from "~/config/prisma.config";
import { type VehicleEntity } from "~/entities/vehicle.entity";

type FindAllArgs = {
  skip: number;
  take: number;
};

type FindOneByPlateArgs = {
  plate: string;
};

type FindOneByUnique = {
  plate?: string;
  chassis?: string;
  renavam?: string;
};

type UpdateByPlateArgs = Omit<Partial<VehicleEntity>, "id"> &
  Required<Pick<VehicleEntity, "plate">>;

type DeleteByPlateArgs = {
  plate: string;
};

export const vehicleRepository = {
  async count() {
    return await prisma.vehicle.count();
  },

  async findAll({ skip, take }: FindAllArgs) {
    return await prisma.vehicle.findMany({
      skip,
      take,
      orderBy: {
        id: "desc",
      },
    });
  },
  async findOneByPlate({ plate }: FindOneByPlateArgs) {
    return await prisma.vehicle.findUnique({
      where: {
        plate,
      },
    });
  },
  async findOneByUnique(unique: FindOneByUnique) {
    return await prisma.vehicle.findUnique({
      where: unique,
    });
  },
  async create(vehicle: Omit<VehicleEntity, "id">) {
    return await prisma.vehicle.create({
      data: vehicle,
    });
  },
  async updateByPlate(vehicle: UpdateByPlateArgs) {
    return await prisma.vehicle.update({
      where: {
        plate: vehicle.plate,
      },
      data: vehicle,
    });
  },
  async deleteByPlate({ plate }: DeleteByPlateArgs) {
    return await prisma.vehicle.delete({
      where: {
        plate,
      },
    });
  },
};
