import { type NextApiRequest, type NextApiResponse } from "next";
import { vehicleService } from "~/services/vehicle.service";
import z from "zod";
import { CustomError } from "~/errors/custom.error";
import NextCors from "nextjs-cors";

type MethodsController = {
  [key: string]: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};

const listVehiclesController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const schema = z.object({
    page: z.preprocess((val) => parseInt(val as string), z.number().min(1)),
    limit: z.preprocess((val) => parseInt(val as string), z.number().min(0)),
  });
  const parseResponse = schema.safeParse(req.query);

  if (!parseResponse.success) {
    return res.status(400).json({
      message: "Invalid query parameters. Check the page and limit parameters.",
    });
  }

  const { page, limit } = parseResponse.data;

  res.status(200).json(
    await vehicleService.listVehicles({
      page,
      limit,
    })
  );
};

const createVehicleController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const schema = z.object({
    plate: z.string().toUpperCase().min(1).max(7),
    year: z.number().max(new Date().getFullYear() + 1),
    chassis: z.string().min(17).max(17),
    renavam: z.string().min(11).max(11),
    model: z.string().min(1).max(60),
    brand: z.string().min(1).max(30),
  });
  const parseResponse = schema.safeParse(req.body);

  if (!parseResponse.success) {
    return res.status(400).json({
      message: "Invalid body request. Check your request body.",
    });
  }

  res
    .status(201)
    .json({ vehicle: await vehicleService.createVehicle(parseResponse.data) });
};

const methodSwitcher = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const methodsController: MethodsController = {
      GET: listVehiclesController,
      POST: createVehicleController,
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
