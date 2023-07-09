import {
  type ResponseObject,
  type PathItemObject,
  type SchemaObject,
} from "openapi3-ts/oas31";
import { commonErrorsDocs } from "../common-errors.docs";
import { vehicleSchemaDocs } from "./schema/vehicleSchema.docs";

const responses: { [key: number]: ResponseObject } = {
  200: {
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
    description: "Invalid body request. Check your request body.",
    content: {
      "application/json": {
        examples: {
          "Invalid query parameter.": {
            value: {
              message:
                "Invalid query parameters. Check the page and limit parameters.",
            },
          },
          "Vehicle not found.": {
            message: "Vehicle not found.",
          },
        },
      },
    },
  },
  ...commonErrorsDocs,
};

const vehicleSchema: SchemaObject = JSON.parse(
  JSON.stringify(vehicleSchemaDocs)
);
delete vehicleSchema.properties?.plate;

export const updateVehiclesDocs: PathItemObject = {
  put: {
    tags: ["Vehicles"],
    summary: "Update a new vehicle.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: vehicleSchema,
        },
      },
    },
    parameters: [
      {
        in: "path",
        name: "plate",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses,
  },
};
