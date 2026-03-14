import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { CreateVehiclePayload } from "./vehicles.types.js";

async function getAllVehicles() {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return vehicles;
  
}


async function getSingleVehicleRepo(id:string){
  const vehicle = await prisma.vehicle.findFirst({
    where:{
      id,
      isDeleted:false,
    }
  })
  return vehicle;
}

async function getVehicleByRegNumber(regNumber: string){
 const vehicle = await prisma.vehicle.findUnique({
    where:{
      registrationNumber: regNumber
    }
    })
  return vehicle;
}


async function createVehicleRepo(payload:CreateVehiclePayload){
   return prisma.vehicle.create({
    data: payload,
  });
}


async function updateVehicleRepo(id: string, payload: Prisma.VehicleUpdateInput) {
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
