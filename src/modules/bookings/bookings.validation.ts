import z from "zod";


export const createBookingSchema = z.object({
    vehicleId:z.uuid("Please provide a valid vehicle id"),
    startDate:z.iso.datetime("Please provide a valid start date"),
    endDate:z.iso.datetime("Please provide a valid end date"),
})
