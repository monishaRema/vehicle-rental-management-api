import { Prisma } from "@prisma/client";

type BookingDetailsInput = {
  id: string;
  startDate: Date;
  endDate: Date;
  totalCost: Prisma.Decimal;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id?: string;
    name: string;
    email?: string;
  };
  vehicle: {
    name: string;
    brand: string;
    model: string;
    fuelType: string;
  };
};

export function formatBookingDetails(booking: BookingDetailsInput) {
  return {
    id: booking.id,
    startDate: booking.startDate,
    endDate: booking.endDate,
    totalCost: booking.totalCost,
    status: booking.status,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,

    ...(booking.user.id && {userId: booking.user.id}),
    userName: booking.user.name,
    ...( booking.user.email && {userEmail: booking.user.email}),

    vehicleName: booking.vehicle.name,
    vehicleBrand: booking.vehicle.brand,
    vehicleModel: booking.vehicle.model,
    vehicleFuelType: booking.vehicle.fuelType,
  };
}