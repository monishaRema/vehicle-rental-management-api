export type CreateBookingPayload = {
  userId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
};

export type CreateBookingPayloadSign = {
    userId:string,
    vehicleId:string,
    startDate:string,
    endDate:string,
    status:"CONFIRMED" | "CANCELLED" |"COMPLETED" | "OVERDUE"
    totalCost:number
}