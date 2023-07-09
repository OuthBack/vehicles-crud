import { CustomError } from "./custom.error";

export class VehicleNotFoundError extends CustomError implements CustomError {
  statusCode = 400;

  constructor() {
    super("Vehicle not found.");
  }
}

export class VehicleAlreadyExistsError
  extends CustomError
  implements CustomError
{
  statusCode = 400;

  constructor() {
    super("Vehicle already exists.");
  }
}
