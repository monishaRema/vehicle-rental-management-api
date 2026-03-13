import { Request, Response } from "express"
import { vehiclesService } from "./vehicles.service.js"
import sendResponse from "../../utils/sendResponse.js";

async function getAllVehicles (_req:Request, res:Response){
    const vehicles = await vehiclesService.getAllVehicles();
    
    sendResponse({
        res,
        statusCode: 200,
        message: "Vehicles fetched successfully",
        data: vehicles
    })
   
}

async function getSingleVehicle(_req:Request, res:Response){
    const vehicle = await vehiclesService.getSingleVehicleService();
    sendResponse({
        res,
        statusCode: 200,
        message: "Single vehicle fetched successfully",
        data: vehicle
    })
}

export const vehiclesController = {
getAllVehicles,
getSingleVehicle
}