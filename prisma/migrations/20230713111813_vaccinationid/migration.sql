/*
  Warnings:

  - The primary key for the `PetVaccination` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `PetVaccination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PetVaccination" DROP CONSTRAINT "PetVaccination_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "PetVaccination_pkey" PRIMARY KEY ("id");
