import { type SchemaObject } from "openapi3-ts/oas31";

export const vehicleSchemaDocs: SchemaObject = {
  type: "object",
  properties: {
    brand: {
      type: "string",
    },
    model: {
      type: "string",
    },
    year: {
      example: 2023,
      type: "number",
    },
    chassis: {
      type: "string",
    },
    plate: {
      type: "string",
    },
    renavam: {
      type: "string",
    },
  },
};
