import { vehiclesRepository } from "./vehicles.repository.js";

async function getAllVehicles(){
  const vehicles = await vehiclesRepository.getAllVehicles();
   
    return vehicles;
}

async function getSingleVehicleService(){
    const vehicle = await vehiclesRepository.getSingleVehicleRepo();
    return vehicle;
}
    

export const vehiclesService = {
    getAllVehicles,
    getSingleVehicleService
}