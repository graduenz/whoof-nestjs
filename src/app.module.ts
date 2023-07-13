import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { PrismaService } from './prisma/prisma.service';
import { VaccinesModule } from './vaccines/vaccines.module';
import { PetVaccinationModule } from './pet-vaccination/pet-vaccination.module';

@Module({
  imports: [PetsModule, VaccinesModule, PetVaccinationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
