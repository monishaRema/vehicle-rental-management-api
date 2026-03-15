import { AppError } from "../../errors/AppError.js";
import { usersRepo } from "./users.repository.js"

async function getAllUsersService(){

    const users = await usersRepo.getAllUsersRepo();

    return users;

}

async function getSingleUserService(id: string){
   

    const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
        throw new AppError(400, "Invalid user id format");
    }

    const user = await usersRepo.getSingleUserRepo(id);

    if(!user){
        throw new AppError(404, "No user found")
    }

    return user;
}


async function updateUserStatus(id: string, payload: {status: string}){
   /*
    1. check id and payload is available or not
    2. check id formate is okay
    3. check user with this id exists or not
    4. check status is within active or inactive  
    5. change the status through repo
    6. send response to controller
   */
    const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if(!uuidRegex.test(id)){
        throw new AppError(400,"Invalid user id")
    }

    if(!payload?.status){
        throw new AppError(400,"Status is required")
    }

    const allowedStatuses = ["ACTIVE", "INACTIVE"];

    if(!allowedStatuses.includes(payload.status)){
         throw new AppError(400,"Status must be within Active or Inactive")
    }

    const existingUser = await usersRepo.getSingleUserRepo(id)

    if(!existingUser){
        throw new AppError(404,"User not found with this id")
    }

    const updatedStatus = await usersRepo.updateUserStatusRepo(id, payload.status as "ACTIVE" | "INACTIVE")

    if(!updatedStatus){
         throw new AppError(400,"User update failed")
    }


    return updatedStatus;




}

async function updateUserRoleService(id: string, payload: {role: string}){

    const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if(!uuidRegex.test(id)){
        throw new AppError(400,"Invalid user id")
    }

    if(!payload?.role){
        throw new AppError(400,"Role is required")
    }

    const allowedRoles = ["USER", "ADMIN"];

    if(!allowedRoles.includes(payload.role)){
         throw new AppError(400,"Role must be within USER or ADMIN")
    }

    const existingUser = await usersRepo.getSingleUserRepo(id)

    if(!existingUser){
        throw new AppError(404,"User not found with this id")
    }

    const updatedRole = await usersRepo.updateUserRoleRepo(id, payload.role as "USER" | "ADMIN")

    if(!updatedRole){
         throw new AppError(400,"User update failed")
    }


    return updatedRole;
    
}



export const usersService = {
    getAllUsersService,
    getSingleUserService,
    updateUserStatus,
    updateUserRoleService
}