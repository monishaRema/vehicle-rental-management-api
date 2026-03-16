import { Request, Response } from "express"
import { vehiclesService } from "./vehicles.service.js"
import sendResponse from "../../utils/sendResponse.js";
import { AppError } from "../../errors/AppError.js";

async function getAllVehicles (req:Request, res:Response){
   const vehicles = await vehiclesService.getAllVehicles(req.query);

    sendResponse({
        res,
        statusCode: 200,
        message: "Vehicles fetched successfully",
        data: vehicles.data,
        meta: vehicles.meta
    })
   
}

async function getSingleVehicle(req:Request, res:Response){

    const {id} = req.params;


    const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(id as string)) {
    throw new AppError(400, "Invalid vehicle id format");
  }



    const vehicle = await vehiclesService.getSingleVehicleService(id as string);
    sendResponse({
        res,
        statusCode: 200,
        message: "Single vehicle fetched successfully",
        data: vehicle
    })
}
async function createVehicle(req:Request, res:Response){
   const vehicleData = req.body;

  const vehicle = await vehiclesService.createVehicleService(vehicleData);

  sendResponse({
    res,
    statusCode: 201,
    message: "Vehicle created successfully",
    data: vehicle,
  });
}

async function updateVehicle(req: Request, res: Response) {
  const { id } = req.params;
  const updateData = req.body;

  const updatedVehicle = await vehiclesService.updateVehicleService(id as string, updateData);

  sendResponse({
    res,
    statusCode: 200,
    message: "Vehicle updated successfully",
    data: updatedVehicle,
  });
}

async function deleteVehicle(req: Request, res: Response) {
  const { id } = req.params;

  const vehicle = await vehiclesService.deleteVehicleService(id as string);

  sendResponse({
    res,
    statusCode: 200,
    message: "Vehicle deleted successfully",
    data: vehicle,
  });
}

export const vehiclesController = {
getAllVehicles,
getSingleVehicle,
createVehicle,
updateVehicle,
deleteVehicle,
}
