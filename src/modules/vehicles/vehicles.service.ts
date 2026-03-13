import { vehiclesRepository } from "./vehicles.repository.js";

async function getAllVehicles(){
  const vehicles = await vehiclesRepository.getAllVehicles();
   
    return vehicles;
}

async function getSingleVehicleService(id:string){
    const vehicle = await vehiclesRepository.getSingleVehicleRepo(id);
    return vehicle;
}
    

export const vehiclesService = {
    getAllVehicles,
    getSingleVehicleService
}