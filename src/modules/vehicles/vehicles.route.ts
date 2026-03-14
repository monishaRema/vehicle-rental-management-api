import { Router } from "express";
import { vehiclesController } from "./vehicles.controller.js";

const vehicleRouter = Router();

// Default endpoint => /api/v1/vehicles


vehicleRouter.get('/', vehiclesController.getAllVehicles);
vehicleRouter.get('/:id',vehiclesController.getSingleVehicle);
vehicleRouter.post('/', vehiclesController.createVehicle);
vehicleRouter.patch('/:id',vehiclesController.updateVehicle);
vehicleRouter.delete('/:id',vehiclesController.deleteVehicle);


export default vehicleRouter;