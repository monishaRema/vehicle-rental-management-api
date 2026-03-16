import { BookingQuery, CreateBookingPayload } from "./bookings.types.js";
import { AppError } from "../../errors/AppError.js";
import { vehiclesService } from "../vehicles/vehicles.service.js";
import { bookingsRepo } from "./bookings.repository.js";
import { formatBookingDetails } from "./bookings.mapper.js";

async function getBookingsService(query: BookingQuery) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;
  const sortBy =
    query.sortBy === "startDate" ||
    query.sortBy === "endDate" ||
    query.sortBy === "totalCost" ||
    query.sortBy === "status"
      ? query.sortBy
      : "createdAt";

  const sortOrder = query.sortOrder || "desc";

  const bookings = await bookingsRepo.getBookingsRepo({
    skip,
    take: limit,
    sortBy,
    sortOrder,
    ...(query.search ? { search: query.search } : {}),
  });

  return {
    data: bookings.data.map(formatBookingDetails),
    meta: bookings.meta,
  };
}

async function getMyBookingsService(userId: string) {
  const myBookings = await bookingsRepo.getMyBookingsRepo(userId);

  if (myBookings.length === 0) {
    throw new AppError(404, "You do not have any bookings");
  }

  return myBookings.map(formatBookingDetails);
}

async function getSingleBookingService(id: string) {
  const booking = await bookingsRepo.getSingleBookingRepo(id);

  if (!booking) {
    throw new AppError(404, "Booking not found with this id");
  }

  return formatBookingDetails(booking);
}

async function getMySingleBookingService(id: string, userId: string) {
  const booking = await bookingsRepo.getSingleBookingRepo(id);

  if (!booking) {
    throw new AppError(404, "Booking not found with this id");
  }

  if (userId !== booking.user.id) {
    throw new AppError(403, "You can see only your own booking");
  }

  return formatBookingDetails(booking);
}

async function createBookingService(payload: CreateBookingPayload) {
  const { userId, vehicleId, startDate, endDate } = payload;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (start <= now) {
    throw new AppError(400, "Start date must be in the future");
  }

  if (end <= start) {
    throw new AppError(400, "End date must be after start date");
  }

  const existingVehicle =
    await vehiclesService.getSingleVehicleService(vehicleId);

  if (existingVehicle.status !== "AVAILABLE") {
    throw new AppError(400, "Vehicle is not available for booking");
  }

  const totalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const totalCost = totalDays * Number(existingVehicle.dailyRate);

  const booking = await bookingsRepo.createBookingRepo({
    userId,
    vehicleId,
    startDate,
    endDate,
    status: "CONFIRMED",
    totalCost,
  });

  if (!booking) {
    throw new AppError(400, "Booking failed");
  }

  return booking;
}

async function updateBookingService() {}
async function deleteBookingService() {}

export const bookingsService = {
  getBookingsService,
  getSingleBookingService,
  getMyBookingsService,
  getMySingleBookingService,
  createBookingService,
  updateBookingService,
  deleteBookingService,
};
