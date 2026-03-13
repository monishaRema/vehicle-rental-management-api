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


async function getSingleVehicleRepo(id:string){
  const vehicle = await prisma.vehicle.findFirst({
    where:{
      id,
      isDeleted:false,
    }
  })
  return vehicle;
}

export const vehiclesRepository = {
  getAllVehicles,
  getSingleVehicleRepo
};