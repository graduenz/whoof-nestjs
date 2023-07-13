import { Module } from '@nestjs/common';
import { PetVaccinationService } from './pet-vaccination.service';
import { PetVaccinationController } from './pet-vaccination.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PetVaccinationService, PrismaService],
  controllers: [PetVaccinationController],
})
export class PetVaccinationModule {}
