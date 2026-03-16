

import { prisma } from "../../lib/prisma.js";
import { CreateBookingPayloadSign } from "./bookings.types.js";

async function getBookingsRepo(){

}
async function getSingleBookingRepo(id: string) {
  return await prisma.booking.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      totalCost: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          email: true,
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
    },
  });

  /**
   * SQL equivalent:
   *
   * SELECT
   *   b.id,
   *   b."startDate",
   *   b."endDate",
   *   b."totalCost",
   *   b.status,
   *   b."createdAt",
   *   b."updatedAt",
   *   u.name As "userName",
   *   u.email,
   *   v.name AS "vehicleName",
   *   v.brand,
   *   v.model,
   *   v."fuelType"
   * FROM "Booking" b
   * JOIN "User" u ON b."userId" = u.id
   * JOIN "Vehicle" v ON b."vehicleId" = v.id
   * WHERE b.id = $1;
   */
}
async function createBookingRepo(payload:CreateBookingPayloadSign){

    return await prisma.booking.create({
        data:payload
    })
    
}

async function updateBookingRepo(){

}
async function deleteBookingRepo(){

}


export const bookingsRepo = {
    getBookingsRepo,
    getSingleBookingRepo,
    createBookingRepo,
    updateBookingRepo,
    deleteBookingRepo
}