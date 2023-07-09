import { type ResponseObject, type PathItemObject } from "openapi3-ts/oas31";
import { commonErrorsDocs } from "../common-errors.docs";

const responses: { [key: number]: ResponseObject } = {
  200: {
    description: "Returns a vehicle object.",
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
    description: "Invalid url parameter. Check plate parameter.",
    content: {
      "application/json": {
        examples: {
          "Invalid url parameter.": {
            value: {
              message: "Invalid url parameter. Check plate parameter.",
            },
          },
        },
      },
    },
  },
  ...commonErrorsDocs,
};

export const getVehicleDocs: PathItemObject = {
  get: {
    tags: ["Vehicles"],
    summary: "Return a vehicle.",
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
