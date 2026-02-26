/*
  Warnings:

  - You are about to drop the column `time` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "time",
ALTER COLUMN "customerId" DROP NOT NULL,
ALTER COLUMN "serviceId" DROP NOT NULL;
