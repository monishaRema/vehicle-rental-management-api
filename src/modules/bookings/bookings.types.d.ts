export type CreateBookingPayload = {
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
};

export type CreateBookingPayloadSign = {
    userId:string,
    vehicleId:string,
    startDate:Date,
    endDate:Date,
    status:"CONFIRMED" | "CANCELLED" |"COMPLETED" | "OVERDUE"
    totalCost:number
}
 export type BookingQuery = {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: "createdAt" | "startDate" | "endDate" | "totalCost" | "status";
  sortOrder?: "asc" | "desc";
};

export type BookingSign = {
    skip: number;
    take: number;
    sortBy: "createdAt" | "startDate" | "endDate" | "totalCost" | "status";
    sortOrder: "asc" | "desc";
    search?: string;
}