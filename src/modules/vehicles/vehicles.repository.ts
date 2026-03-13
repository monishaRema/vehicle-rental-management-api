import { prisma } from "../../lib/prisma.js";

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


async function getSingleVehicleRepo(){
  const vehicle = await prisma.vehicle.findUnique()
  return vehicle;
}

export const vehiclesRepository = {
  getAllVehicles,
  getSingleVehicleRepo
};