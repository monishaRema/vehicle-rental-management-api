import { Router } from "express";
import { vehiclesController } from "./vehicles.controller.js";

const vehicleRouter = Router();

// Default endpoint => /api/v1/vehicles  => /


// GET  => /api/v1/vehicles
vehicleRouter.get('/', vehiclesController.getAllVehicles);

// GET  => /api/v1/vehicles/:id
vehicleRouter.get('/:id',vehiclesController.getSingleVehicle);

// POST  => /api/v1/vehicles

// DELETE  => /api/v1/vehicles



export default vehicleRouter;