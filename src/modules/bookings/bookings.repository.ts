

import { prisma } from "../../lib/prisma.js";
import { CreateBookingPayloadSign } from "./bookings.types.js";

async function getBookingsRepo(){

}
async function getSingleBookingRepo(){

}
async function createBookingRepo(payload:CreateBookingPayloadSign){

    return await prisma.booking.create({
        data:payload
    })
    
}

async function updateBookingRepo(){

}
async function deleteBookingRepo(){

}


export const bookingsRepo = {
    getBookingsRepo,
    getSingleBookingRepo,
    createBookingRepo,
    updateBookingRepo,
    deleteBookingRepo
}