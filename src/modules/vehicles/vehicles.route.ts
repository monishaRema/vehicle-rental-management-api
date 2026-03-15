import { Router } from "express";
import { vehiclesController } from "./vehicles.controller.js";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";

const vehicleRouter = Router();

// Default endpoint => /api/v1/vehicles

vehicleRouter.get("/", vehiclesController.getAllVehicles);
vehicleRouter.get("/:id", vehiclesController.getSingleVehicle);
vehicleRouter.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  vehiclesController.createVehicle,
);
vehicleRouter.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  vehiclesController.updateVehicle,
);
vehicleRouter.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  vehiclesController.deleteVehicle,
);

export default vehicleRouter;
