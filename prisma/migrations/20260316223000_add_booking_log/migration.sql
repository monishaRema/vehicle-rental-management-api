-- CreateEnum
CREATE TYPE "BookingAction" AS ENUM ('CREATED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "BookingLog" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "action" "BookingAction" NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookingLog_bookingId_idx" ON "BookingLog"("bookingId");

-- AddForeignKey
ALTER TABLE "BookingLog" ADD CONSTRAINT "BookingLog_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
