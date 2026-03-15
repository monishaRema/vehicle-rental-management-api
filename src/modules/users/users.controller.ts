import { Request, Response } from "express";
import { usersService } from "./users.service.js";
import sendResponse from "../../utils/sendResponse.js";

async function getAllUsers(_req:Request, res:Response){
        const users = await usersService.getAllUsersService();

        sendResponse({
            res,
            statusCode: 200,
            message: "Users fetched successfully",
            data: users
        });
}

async function getSingleUser(req:Request, res:Response){
    const {id} = req.params;

    const user = await usersService.getSingleUserService(id as string);
    sendResponse({
            res,
            statusCode: 200,
            message: "User fetched successfully",
            data: user
    });
    
}


async function updateUserStatus(req:Request, res:Response){
    const {id} = req.params;
    const payload = req.body;

    const user = await usersService.updateUserStatus(id as string, payload);

    sendResponse({
            res,
            statusCode: 200,
            message: "User updated successfully",
            data: user
    });


    
}
async function updateUserRole(req:Request, res:Response){
    const {id} = req.params;
    const payload = req.body;
    const user = await usersService.updateUserRoleService(id as string, payload);

    sendResponse({
            res,
            statusCode: 200,
            message: "User role updated successfully",
            data: user
    });
}



export const usersController = {
    getAllUsers,
    getSingleUser,
    updateUserStatus,
    updateUserRole
}