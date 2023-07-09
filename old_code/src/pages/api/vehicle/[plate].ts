import { type NextApiRequest, type NextApiResponse } from "next";
import { vehicleService } from "~/services/vehicle.service";
import z from "zod";
import { CustomError } from "~/errors/custom.error";
import NextCors from "nextjs-cors";

type MethodsController = {
  [key: string]: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};

const getVehicleController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const schema = z.object({
      plate: z.string().toUpperCase().min(7).max(7),
    });
    const parseResponse = schema.safeParse({
      plate: req.url?.split("/").at(-1),
    });

    if (!parseResponse.success) {
      return res.status(400).json({
        message: "Invalid url parameter. Check plate parameter.",
      });
    }
    res.status(200).json({
      vehicle: await vehicleService.getVehicleByPlate(parseResponse.data),
    });
  } catch (error) {
    const err = error as Error;

    res.status(500).json({
      message: err.message,
    });
  }
};

const updateVehicleController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const schema = z.object({
    plate: z.string().toUpperCase().min(1).max(7),
    year: z
      .number()
      .max(new Date().getFullYear() + 1)
      .optional(),
    chassis: z.string().min(17).max(17).optional(),
    renavam: z.string().min(11).max(11).optional(),
    model: z.string().min(1).max(60).optional(),
    brand: z.string().min(1).max(30).optional(),
  });
  const parseResponse = schema.safeParse({
    ...req.body,
    plate: req.url?.split("/").at(-1),
  });

  if (!parseResponse.success) {
    return res.status(400).json({
      message: "Invalid body request. Check your request body.",
    });
  }

  res.status(200).json({
    vehicle: await vehicleService.updateVehicleByPlate(parseResponse.data),
  });
};

const deleteVehicleController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const schema = z.object({
    plate: z.string().toUpperCase().min(1).max(7),
  });
  const parseResponse = schema.safeParse({ plate: req.url?.split("/").at(-1) });

  if (!parseResponse.success) {
    return res.status(400).json({
      message: "Invalid url parameter. Check plate parameter.",
    });
  }

  res.status(200).json({
    vehicle: await vehicleService.deleteVehicleByPlate(parseResponse.data),
  });
};

const methodSwitcher = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const methodsController: MethodsController = {
      GET: getVehicleController,
      PUT: updateVehicleController,
      DELETE: deleteVehicleController,
    };

    await NextCors(req, res, {
      methods: Object.keys(methodsController),
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const message = { message: "Method not allowed." };

    if (!req.method) {
      return res.status(405).json(message);
    }
    const methodFunction = methodsController[req.method];

    if (!methodFunction) {
      return res.status(405).json(message);
    }

    return await methodFunction(req, res);
  } catch (error) {
    const err = error as CustomError | Error;

    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: "An error occurred in our server.",
    });
  }
};

export default methodSwitcher;
