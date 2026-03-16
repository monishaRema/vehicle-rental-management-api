import cors from "cors";
import express from "express";
import helmet from "helmet";
import { notFound } from "./middleware/notFound.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import sendResponse from "./utils/sendResponse.js";
import vehicleRouter from "./modules/vehicles/vehicles.route.js";
import { usersRouter } from "./modules/users/users.route.js";
import authRouter from "./modules/auth/auth.route.js";
import { authenticate } from "./middleware/authentication.js";
import { bookingRouter } from "./modules/bookings/bookings.routes.js";

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  sendResponse({ res, statusCode: 200, message: "Server is running" });
});

// Vehicle Routes => /api/v1/vehicles
app.use("/api/v1/vehicles", vehicleRouter)

app.use("/api/v1/auth",authRouter)

// Users Routes => /api/v1/users
app.use("/api/v1/users",authenticate, usersRouter)

// Bookings Routes => /api/v1/bookings
app.use("/api/v1/bookings",authenticate,bookingRouter)

app.use(notFound);
app.use(globalErrorHandler);

export default app;
