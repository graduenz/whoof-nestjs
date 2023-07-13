/*
  Warnings:

  - Added the required column `appliedAt` to the `PetVaccination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PetVaccination" ADD COLUMN     "appliedAt" TIMESTAMP(3) NOT NULL;
