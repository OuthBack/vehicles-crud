import { writeFileSync } from "fs";
import { OpenApiBuilder } from "openapi3-ts/oas31";
import path from "path";
import { paths } from "~/docs/api.docs";

const docs = new OpenApiBuilder({
  info: {
    title: "Vehicles API",
    version: "1.0.0",
    description: "", // by default: ''
  },
  openapi: "3.0.1",
  paths,
});

writeFileSync(
  path.join(__dirname, "../docs/swagger.json"),
  docs.getSpecAsJson()
);
