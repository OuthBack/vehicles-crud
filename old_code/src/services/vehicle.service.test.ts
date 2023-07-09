import { describe } from "mocha";
import Sinon from "sinon";
import { vehicleRepository } from "~/repositories/vehicle.repository";
import { vehicleService } from "./vehicle.service";
import { expect } from "chai";
import { type VehicleEntity } from "~/entities/vehicle.entity";
import {
  VehicleAlreadyExistsError,
  VehicleNotFoundError,
} from "~/errors/vehicle.error";

describe("Vehicles Test", () => {
  const sandbox = Sinon.createSandbox();
  const vehicles: VehicleEntity[] = [];

  for (let year = 2000; year < 2020; year++) {
    vehicles.push({
      id: 2023 - year,
      brand: "Ford",
      model: "Toyota",
      year,
      chassis: "9BWZZZ377VT004251",
      plate: "ABC-1234",
      renavam: "12345678901",
    });
  }

  afterEach(async function () {
    sandbox.restore();
  });

  describe("listVehiclesService", function () {
    it("should return vehicles", async function () {
      sandbox.stub(vehicleRepository, "count").resolves(20);
      sandbox
        .stub(vehicleRepository, "findAll")
        .resolves(vehicles.slice(0, 10));

      const actual = await vehicleService.listVehicles({
        page: 1,
        limit: 10,
      });
      const expected = {
        vehicles: vehicles.slice(0, 10),
        page: 1,
        limit: 10,
        totalPages: 2,
        totalItems: 20,
      };

      expect(actual).to.be.deep.equal(expected);
    });

    it("should return empty array if page and limit are bigger", async function () {
      sandbox.stub(vehicleRepository, "count").resolves(0);
      sandbox.stub(vehicleRepository, "findAll").resolves([]);

      const actual = await vehicleService.listVehicles({
        page: 50,
        limit: 100,
      });
      const expected = {
        vehicles: [],
        page: 50,
        limit: 100,
        totalPages: 0,
        totalItems: 0,
      };

      expect(actual).to.be.deep.equal(expected);
    });
  });

  describe("getVehicleService", function () {
    it("should return vehicle", async function () {
      sandbox.stub(vehicleRepository, "findOneByPlate").resolves(vehicles[0]);

      const actual = await vehicleService.getVehicleByPlate({
        plate: "ABC-1234",
      });
      const expected = vehicles[0];

      expect(actual).to.be.deep.equal(expected);
    });
  });

  describe("createVehicleService", function () {
    it("should return vehicle", async function () {
      if (!vehicles[0]) {
        throw new Error("Not vehicle");
      }
      sandbox.stub(vehicleRepository, "findOneByPlate").resolves(null);
      sandbox.stub(vehicleRepository, "findOneByUnique").resolves(null);

      sandbox.stub(vehicleRepository, "create").resolves(vehicles[0]);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const actual = await vehicleService.createVehicle(vehicles[0]);
      const expected = vehicles[0];

      expect(actual).to.be.deep.equal(expected);
    });

    it("should throw VehicleAlreadyExistsError if plate exists", async function () {
      if (!vehicles[0]) {
        throw new Error("Not vehicle");
      }

      try {
        sandbox.stub(vehicleRepository, "findOneByPlate").resolves(vehicles[0]);

        await vehicleService.createVehicle(vehicles[0]);
      } catch (error) {
        expect(error).to.be.instanceof(VehicleAlreadyExistsError);
      }
    });
  });

  describe("updateVehicleService", function () {
    it("should update and return vehicle", async function () {
      if (!vehicles[0]) {
        throw new Error("Not vehicle");
      }

      sandbox.stub(vehicleRepository, "findOneByPlate").resolves(vehicles[0]);
      sandbox.stub(vehicleRepository, "updateByPlate").resolves(vehicles[0]);

      const actual = await vehicleService.updateVehicleByPlate({
        plate: "ABC-1234",
      });
      const expected = vehicles[0];

      expect(actual).to.be.deep.equal(expected);
    });

    it("should throw VehicleNotFoundError if plate not exists", async function () {
      try {
        sandbox.stub(vehicleRepository, "findOneByPlate").resolves(null);
        await vehicleService.updateVehicleByPlate({ plate: "ABC-1234" });
      } catch (error) {
        expect(error).to.be.instanceof(VehicleNotFoundError);
      }
    });
  });
  describe("deleteVehicleService", function () {
    it("should delete vehicle", async function () {
      sandbox.stub(vehicleRepository, "findOneByPlate").resolves(vehicles[0]);
      sandbox.stub(vehicleRepository, "deleteByPlate").resolves(vehicles[0]);

      const actual = await vehicleService.deleteVehicleByPlate({
        plate: "ABC-1234",
      });
      const expected = vehicles[0];

      expect(actual).to.be.equal(expected);
    });

    it("should throw VehicleNotFoundError if plate not exists", async function () {
      try {
        sandbox.stub(vehicleRepository, "findOneByPlate").resolves(null);
        await vehicleService.deleteVehicleByPlate({ plate: "ABC-1234" });
      } catch (error) {
        expect(error).to.be.instanceof(VehicleNotFoundError);
      }
    });
  });
});
