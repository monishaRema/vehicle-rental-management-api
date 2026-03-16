import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { bookingsService } from "./bookings.service.js";
import { AppError } from "../../errors/AppError.js";

async function getBookings(req:Request,res:Response){
    const bookings = ""

    sendResponse({
        res,
        statusCode:200,
        message:"Fetched bookings successfully",
        data:bookings
    })
}



async function getSingleBookings(req:Request,res:Response){
    const booking = ""

    sendResponse({
        res,
        statusCode:200,
        message:"Fetched booking successfully",
        data:booking
    })
}

async function createBooking(req:Request,res:Response){


    if(!req.user){
        throw new AppError(401,"Unauthorized")
    }
    const {userId} = req.user


    const booking = await bookingsService.createBookingService({userId,...req.body})

    sendResponse({
        res,
        statusCode:200,
        message:"Created booking successfully",
        data:booking
    })
}

async function updateBooking(req:Request,res:Response){
    const updatedBooking = ""

    sendResponse({
        res,
        statusCode:200,
        message:"Updated booking successfully",
        data:updateBooking
    })
}

async function deleteBooking(req:Request,res:Response){
    const deletedBooking = ""

    sendResponse({
        res,
        statusCode:200,
        message:"Booking deleted successfully",
        data:deletedBooking
    })
}



export const bookingController = {
    getBookings,
    getSingleBookings,
    createBooking,
    updateBooking,
    deleteBooking
}