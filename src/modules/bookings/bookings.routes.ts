import { Router } from "express";
import { bookingController } from "./bookings.controller.js";
import { authorize } from "../../middleware/authorization.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createBookingSchema } from "./bookings.validation.js";

export const bookingRouter = Router();


 bookingRouter.get("/",authorize("ADMIN"),bookingController.getBookings)
 bookingRouter.get("/:id", bookingController.getSingleBookings)
 bookingRouter.post("/",validateRequest(createBookingSchema,"body"), bookingController.createBooking)
 bookingRouter.patch("/:id", bookingController.updateBooking)
 bookingRouter.delete("/:id", bookingController.deleteBooking)


