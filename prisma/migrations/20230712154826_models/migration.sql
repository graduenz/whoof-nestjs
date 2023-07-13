/*
  Warnings:

  - Changed the type of `type` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT', 'CAPYBARA', 'OTHER');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "type",
ADD COLUMN     "type" "PetType" NOT NULL;

-- CreateTable
CREATE TABLE "Vaccine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "petType" "PetType" NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetVaccination" (
    "petId" TEXT NOT NULL,
    "vaccineId" TEXT NOT NULL,

    CONSTRAINT "PetVaccination_pkey" PRIMARY KEY ("petId","vaccineId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vaccine_name_key" ON "Vaccine"("name");

-- AddForeignKey
ALTER TABLE "PetVaccination" ADD CONSTRAINT "PetVaccination_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetVaccination" ADD CONSTRAINT "PetVaccination_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "Vaccine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
