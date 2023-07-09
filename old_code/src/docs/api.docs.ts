import { type PathsObject } from "openapi3-ts/oas31";
import { listVehiclesDocs } from "./vehicles/listVehicles.docs";
import { getVehicleDocs } from "./vehicles/getVehicle.docs";
import { createVehicleDocs } from "./vehicles/createVehicle.docs";
import { updateVehiclesDocs } from "./vehicles/updateVehicle.docs";
import { deleteVehiclesDocs } from "./vehicles/deleteVehicle.docs";

const addApiToDocs = (docs: PathsObject) => {
  Object.keys(docs).forEach((endpoint) => {
    delete Object.assign(docs, { ["/api" + endpoint]: docs[endpoint] })[
      endpoint
    ];
  });
  return docs;
};

export const paths: PathsObject = {
  ...addApiToDocs({
    "/vehicle": {
      ...listVehiclesDocs,
      ...createVehicleDocs,
    },
    "/vehicle/{plate}": {
      ...getVehicleDocs,
      ...updateVehiclesDocs,
      ...deleteVehiclesDocs,
    },
  }),
};
