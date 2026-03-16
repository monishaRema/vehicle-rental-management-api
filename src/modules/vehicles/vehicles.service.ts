import { Prisma } from "@prisma/client";
import { AppError } from "../../errors/AppError.js";
import { vehiclesRepository } from "./vehicles.repository.js";
import { CreateVehiclePayload, VehicleQuery } from "./vehicles.types.js";

async function getAllVehicles(query:VehicleQuery ){
  
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder || "desc";


  return await vehiclesRepository.getAllVehicles({
    skip,
    take: limit,
    sortBy,
    sortOrder,
    ...(query.search ? { search: query.search } : {}),
  });
}

async function getSingleVehicleService(id:string){
    const vehicle = await vehiclesRepository.getSingleVehicleRepo(id);

    if(!vehicle){
        throw new AppError(404,"No vehicle found")
    }

    return vehicle;
}


async function createVehicleService(payload: CreateVehiclePayload) {
  const {
    name,
    brand,
    model,
    year,
    type,
    fuelType,
    transmission,
    dailyRate,
    seatingCapacity,
    registrationNumber,
  } = payload;

  if (
    !name ||
    !brand ||
    !model ||
    !year ||
    !type ||
    !fuelType ||
    !transmission ||
    !dailyRate ||
    !seatingCapacity ||
    !registrationNumber
  ) {
    throw new AppError(400, "All vehicle fields are required");
  }

  const existingVehicle = await vehiclesRepository.getVehicleByRegNumber(registrationNumber);

  if (existingVehicle) {
    throw new AppError(409, "Vehicle already exists with this registration number");
  }

  const vehicle = await vehiclesRepository.createVehicleRepo({
    name,
    brand,
    model,
    year,
    type,
    fuelType,
    transmission,
    dailyRate,
    seatingCapacity,
    registrationNumber,
  });

  return vehicle;
}

async function updateVehicleService(id:string, payload: Prisma.VehicleUpdateInput){
    const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(id)) {
    throw new AppError(400, "Invalid vehicle id format");
  }

  if (!payload || Object.keys(payload).length === 0) {
    throw new AppError(400, "Update data is required");
  }


  const forbiddenFields = ["id", "isDeleted", "createdAt", "updatedAt"];
  for (const field of forbiddenFields) {
    if (field in payload) {
      throw new AppError(400, `${field} cannot be updated`);
    }
  }


  const existingVehicle = await vehiclesRepository.getSingleVehicleRepo(id);

  if (!existingVehicle) {
    throw new AppError(404, "Vehicle not found");
  }

  return vehiclesRepository.updateVehicleRepo(id, payload);
}


async function deleteVehicleService(id: string) {
  const vehicle = await vehiclesRepository.getSingleVehicleRepo(id);

  if (!vehicle) {
    throw new AppError(404, "Vehicle not found");
  }

  return vehiclesRepository.deleteVehicleRepo(id);
}

    

export const vehiclesService = {
    getAllVehicles,
    getSingleVehicleService,
    createVehicleService,
    updateVehicleService,
    deleteVehicleService,
}
