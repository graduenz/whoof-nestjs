import { Module } from '@nestjs/common';
import { PetVaccinationService } from './pet-vaccination.service';
import { PetVaccinationController } from './pet-vaccination.controller';

@Module({
  providers: [PetVaccinationService],
  controllers: [PetVaccinationController],
})
export class PetVaccinationModule {}
