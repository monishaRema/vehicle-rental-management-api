import { Router } from "express";
import { vehiclesController } from "./vehicles.controller.js";
import { authenticate } from "../../middleware/authentication.js";

const vehicleRouter = Router();

// Default endpoint => /api/v1/vehicles


vehicleRouter.get('/', vehiclesController.getAllVehicles);
vehicleRouter.get('/:id',vehiclesController.getSingleVehicle);
vehicleRouter.post('/',authenticate, vehiclesController.createVehicle);
vehicleRouter.patch('/:id',authenticate, vehiclesController.updateVehicle);
vehicleRouter.delete('/:id',authenticate, vehiclesController.deleteVehicle);


export default vehicleRouter;