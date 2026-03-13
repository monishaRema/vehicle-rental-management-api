import cors from "cors";
import express from "express";
import helmet from "helmet";
import { notFound } from "./middleware/notFound.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import sendResponse from "./utils/sendResponse.js";
import vehicleRouter from "./modules/vehicles/vehicles.route.js";

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  sendResponse({ res, statusCode: 200, message: "Server is running" });
});

// Vehicle Routes => /api/v1/vehicles
app.use("/api/v1/vehicles", vehicleRouter)


app.use(notFound);
app.use(globalErrorHandler);

export default app;
