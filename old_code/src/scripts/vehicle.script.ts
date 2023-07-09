import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

async function populateVehicle() {
  await prisma.vehicle.deleteMany({});
  const vehicles = [];

  for (let year = 2000; year < 2020; year++) {
    vehicles.push({
      brand: "Ford",
      model: "Fiesta",
      year,
      chassis: `6FDGX2V6pA99R${8000 - year}`,
      plate: `ABC${year}`,
      renavam: `1234567${4320 - year}`,
    });
  }

  await prisma.vehicle.createMany({
    data: vehicles,
  });
}

void populateVehicle();
