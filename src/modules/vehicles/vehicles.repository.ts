import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { CreateVehiclePayload, VehicleSign } from "./vehicles.types.js";

async function getAllVehicles(query: VehicleSign) {

  

  const whereCondition: Prisma.VehicleWhereInput = {
    isDeleted: false,
    ...(query.search
      ? {
          OR: [
            {
              name: {
                contains: query.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              brand: {
                contains: query.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              model: {
                contains: query.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {}),
  };

  const total = await prisma.vehicle.count({
    where: whereCondition,
  });

  const vehicles = await prisma.vehicle.findMany({
    where: whereCondition,
    skip: query.skip,
    take: query.take,
    orderBy: {
      [query.sortBy]: query.sortOrder,
    },
  });

  return {
    meta: {
      page: Math.floor(query.skip / query.take) + 1,
      limit: query.take,
      total,
      totalPages: Math.ceil(total / query.take),
    },
    data: vehicles,
  };
}

async function getSingleVehicleRepo(id: string) {
  const vehicle = await prisma.vehicle.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });
  return vehicle;
}

async function getVehicleByRegNumber(regNumber: string) {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      registrationNumber: regNumber,
    },
  });
  return vehicle;
}

async function createVehicleRepo(payload: CreateVehiclePayload) {
  return prisma.vehicle.create({
    data: payload,
  });
}

async function updateVehicleRepo(
  id: string,
  payload: Prisma.VehicleUpdateInput,
) {
  return prisma.vehicle.update({
    where: {
      id,
    },
    data: payload,
  });
}

async function deleteVehicleRepo(id: string) {
  return prisma.vehicle.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
}
export const vehiclesRepository = {
  getAllVehicles,
  getSingleVehicleRepo,
  createVehicleRepo,
  getVehicleByRegNumber,
  updateVehicleRepo,
  deleteVehicleRepo,
};
