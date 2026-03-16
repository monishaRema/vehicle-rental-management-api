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


export function bookingSelectByView(view:"ADMIN" | "USER"){
    return { 
      id: true,
      startDate: true,
      endDate: true,
      totalCost: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          ...(view == "ADMIN" && {id:true}),
          name: true,
          ...(view == "ADMIN" && {email:true}),
        },
      },
      vehicle: {
        select: {
          name: true,
          brand: true,
          model: true,
          fuelType: true,
        },
      },
    }  
}