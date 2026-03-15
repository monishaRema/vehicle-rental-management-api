import { Router } from "express";
import { vehiclesController } from "./vehicles.controller.js";
import { authenticate } from "../../middleware/authentication.js";

const vehicleRouter = Router();

// Default endpoint => /api/v1/vehicles


vehicleRouter.get('/',authenticate, vehiclesController.getAllVehicles);
vehicleRouter.get('/:id',vehiclesController.getSingleVehicle);
vehicleRouter.post('/', vehiclesController.createVehicle);
vehicleRouter.patch('/:id',vehiclesController.updateVehicle);
vehicleRouter.delete('/:id',vehiclesController.deleteVehicle);


export default vehicleRouter;