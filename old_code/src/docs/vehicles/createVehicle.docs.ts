import { type PathItemObject, type ResponseObject } from "openapi3-ts/oas31";
import { commonErrorsDocs } from "../common-errors.docs";
import { vehicleSchemaDocs } from "./schema/vehicleSchema.docs";

const responses: { [key: number]: ResponseObject } = {
  201: {
    description: "Creates and return a vehicle object.",
    content: {
      "application/json": {
        example: {
          vehicle: {
            id: 1,
            brand: "Ford",
            model: "Fiesta",
            year: 2023,
            chassis: "9BWZZZ377VT004251",
            plate: "ABC-1234",
            renavam: "12345678901",
          },
        },
      },
    },
  },
  400: {
    description: "Invalid body request",
    content: {
      "application/json": {
        examples: {
          "Vehicle already exists.": {
            description: "Vehicle already exists.",
            value: {
              message: "Vehicle already exists.",
            },
          },
          "Invalid body request.": {
            description: "Invalid body request. Check your request body.",
            value: {
              message: "Invalid body request. Check your request body.",
            },
          },
        },
      },
    },
  },
  ...commonErrorsDocs,
};

export const createVehicleDocs: PathItemObject = {
  post: {
    tags: ["Vehicles"],
    summary: "Create a new vehicle.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            ...vehicleSchemaDocs,
            required: ["brand", "model", "year", "chassis", "plate", "renavam"],
          },
        },
      },
    },
    responses,
  },
};
