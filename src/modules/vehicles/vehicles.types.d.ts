export type CreateVehiclePayload = {
  name: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  fuelType: string;
  transmission: string;
  dailyRate: number;
  seatingCapacity: number;
  registrationNumber: string;
};

 export type VehicleQuery = {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

type VehicleSign =  {
  skip: number,
  take: number,
  sortBy: string,
  sortOrder: "asc" | "desc",
  search?: string
}
