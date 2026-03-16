import { Router } from "express";
import { bookingController } from "./bookings.controller.js";
import { authorize } from "../../middleware/authorization.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createBookingSchema } from "./bookings.validation.js";

export const bookingRouter = Router();


bookingRouter.get("/me", bookingController.getMyBookings)
bookingRouter.get("/me/:id", bookingController.getMySingleBooking)
 bookingRouter.get("/",authorize("ADMIN"),bookingController.getBookings)
 bookingRouter.get("/:id",authorize("ADMIN"), bookingController.getSingleBooking)
 bookingRouter.post("/",validateRequest(createBookingSchema,"body"), bookingController.createBooking)
 bookingRouter.patch("/:id/cancel", bookingController.cancelBooking)
 bookingRouter.patch("/:id/complete", bookingController.completeBooking)
 bookingRouter.delete("/:id", bookingController.deleteBooking)


