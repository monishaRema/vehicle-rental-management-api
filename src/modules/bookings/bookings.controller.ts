import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { bookingsService } from "./bookings.service.js";
import { AppError } from "../../errors/AppError.js";

async function getBookings(req: Request, res: Response) {
  const bookings = await bookingsService.getBookingsService(req.query);

  sendResponse({
    res,
    statusCode: 200,
    message: "Fetched bookings successfully",
    data: bookings.data,
    meta: bookings.meta
  });
}

async function getSingleBooking(req: Request, res: Response) {
  const { id } = req.params;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(id as string)) {
    throw new AppError(400, "Invalid booking id format");
  }

  const booking = await bookingsService.getSingleBookingService(id as string)

  sendResponse({
    res,
    statusCode: 200,
    message: "Fetched booking successfully",
    data: booking,
  });
}

async function getMyBookings(req:Request,res:Response){
    if(!req.user){
        throw new AppError(401, "Unauthorized")
    }

    const myBookings = await bookingsService.getMyBookingsService(req.user.userId)

    sendResponse({
        res,
        statusCode:200,
        message:"Fetched your booking successfully",
        data:myBookings
    })

}

async function getMySingleBooking(req: Request, res: Response) {
    if(!req.user){
        throw new AppError(400,"Unauthorized")
    }

  const {userId} = req.user
  const { id } = req.params;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(id as string)) {
    throw new AppError(400, "Invalid booking id format");
  }

  const booking = await bookingsService.getMySingleBookingService(id as string, userId)

  sendResponse({
    res,
    statusCode: 200,
    message: "Fetched booking successfully",
    data: booking,
  });
}


async function createBooking(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Unauthorized");
  }
  const { userId } = req.user;

  const booking = await bookingsService.createBookingService({
    userId,
    ...req.body,
  });

  sendResponse({
    res,
    statusCode: 200,
    message: "Created booking successfully",
    data: booking,
  });
}

async function updateBooking(req: Request, res: Response) {
  const updatedBooking = "";

  sendResponse({
    res,
    statusCode: 200,
    message: "Updated booking successfully",
    data: updateBooking,
  });
}

async function deleteBooking(req: Request, res: Response) {
  const deletedBooking = "";

  sendResponse({
    res,
    statusCode: 200,
    message: "Booking deleted successfully",
    data: deletedBooking,
  });
}

export const bookingController = {
  getBookings,
  getSingleBooking,
  getMyBookings,
  getMySingleBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
