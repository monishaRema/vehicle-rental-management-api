import { CreateBookingPayload } from "./bookings.types.js";
import { AppError } from "../../errors/AppError.js";
import { vehiclesService } from "../vehicles/vehicles.service.js";
import { bookingsRepo } from "./bookings.repository.js";


async function getBookingsService(){

}
async function getSingleBookingService(id:string){
  const booking = await bookingsRepo.getSingleBookingRepo(id)

  if(!booking){
    throw new AppError(404,"Booking not found with this id")
  }

  return {
    id: booking.id,
    startDate: booking.startDate,
    endDate: booking.endDate,
    totalCost: booking.totalCost,
    status: booking.status,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,

    userName: booking.user.name,
    userEmail: booking.user.email,

    vehicleName: booking.vehicle.name,
    vehicleBrand: booking.vehicle.brand,
    vehicleModel: booking.vehicle.model,
    vehicleFuelType: booking.vehicle.fuelType,
  };


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

  const existingVehicle = await vehiclesService.getSingleVehicleService(vehicleId);

  if (existingVehicle.status !== "AVAILABLE") {
    throw new AppError(400, "Vehicle is not available for booking");
  }

  const totalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const totalCost = totalDays * Number(existingVehicle.dailyRate);

  const booking = await bookingsRepo.createBookingRepo({
    userId,
    vehicleId,
    startDate,
    endDate,
    status:"CONFIRMED",
    totalCost,
  })

  if(!booking){
    throw new AppError(400, "Booking failed");
  }

  return booking
}

async function updateBookingService(){

}
async function deleteBookingService(){

}


export const bookingsService = {
    getBookingsService,
    getSingleBookingService,
    createBookingService,
    updateBookingService,
    deleteBookingService
}