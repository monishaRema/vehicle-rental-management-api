import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { bookingSelectByView } from "./bookings.mapper.js";
import { BookingSign, CreateBookingPayloadSign } from "./bookings.types.js";

async function getBookingsRepo(query: BookingSign) {
  const whereCondition: Prisma.BookingWhereInput = {
    ...(query.search
      ? {
          OR: [
            {
              vehicle: {
                name: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
            },
            {
              vehicle: {
                brand: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
            },
            {
              vehicle: {
                model: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
            },
            {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
            },
            {
              user: {
                email: {
                  contains: query.search,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {}),
  };

  const total = await prisma.booking.count({
    where: whereCondition,
  });

  const bookings = await prisma.booking.findMany({
    where: whereCondition,
    select: bookingSelectByView("ADMIN"),
    skip: query.skip,
    take: query.take,
    orderBy: {
      [query.sortBy]: query.sortOrder,
    },
  });

  return {
    data: bookings,
    meta: {
      page: Math.floor(query.skip / query.take) + 1,
      limit: query.take,
      total,
      totalPages: Math.ceil(total / query.take),
    },
  };
}
async function getMyBookingsRepo(userId: string) {
  return await prisma.booking.findMany({
    where: {
      userId,
    },
    select: bookingSelectByView("USER"),
  });
}

async function getSingleBookingRepo(id: string) {
  return await prisma.booking.findUnique({
    where: {
      id,
    },
    select: bookingSelectByView("ADMIN"),
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

async function createBookingRepo(payload: CreateBookingPayloadSign) {
  return await prisma.booking.create({
    data: payload,
  });
}

async function updateBookingRepo() {}
async function deleteBookingRepo() {}

export const bookingsRepo = {
  getBookingsRepo,
  getSingleBookingRepo,
  createBookingRepo,
  updateBookingRepo,
  deleteBookingRepo,
  getMyBookingsRepo,
};
