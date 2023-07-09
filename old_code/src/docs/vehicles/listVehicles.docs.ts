import { type ResponseObject, type PathItemObject } from "openapi3-ts/oas31";
import { commonErrorsDocs } from "../common-errors.docs";

const responses: { [key: number]: ResponseObject } = {
  200: {
    description: "Returns a list of vehicles.",
    content: {
      "application/json": {
        example: {
          page: 1,
          limit: 10,
          totalPages: 10,
          totalItems: 20,
          vehicles: new Array(10).fill(null).map((_, index) => ({
            id: index + 1,
            brand: "Ford",
            model: "Fiesta",
            year: 2000 + index,
            chassis: "9BWZZZ377VT004251",
            plate: `ABC-${2000 + index}`,
            renavam: "12345678901",
          })),
        },
      },
    },
  },
  400: {
    description:
      "Invalid query parameters. Check the page and limit parameters.",
    content: {
      "application/json": {
        examples: {
          "Invalid query parameter.": {
            value: {
              message:
                "Invalid query parameters. Check the page and limit parameters.",
            },
          },
        },
      },
    },
  },
  ...commonErrorsDocs,
};

export const listVehiclesDocs: PathItemObject = {
  get: {
    tags: ["Vehicles"],
    summary: "Return a list of vehicles.",
    parameters: [
      {
        in: "query",
        name: "page",
        required: true,
        schema: {
          type: "number",
          minimum: 1,
        },
      },
      {
        in: "query",
        name: "limit",
        required: true,
        schema: {
          type: "number",
          minimum: 0,
        },
      },
    ],
    responses,
  },
};
