import cron from "node-cron";
import { bookingsService } from "../modules/bookings/bookings.service.js";


export function startBookingAutoCompleteJob() {
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("[CRON] Running booking auto-complete job...");

      const result = await bookingsService.autoCompleteExpiredBookingsService();

      console.log(
        `[CRON] Booking auto-complete finished. Completed: ${result.completedCount}`
      );
    } catch (error) {
      console.error("[CRON] Booking auto-complete job failed:", error);
    }
  });
}