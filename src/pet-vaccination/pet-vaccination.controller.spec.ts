import { Test, TestingModule } from '@nestjs/testing';
import { PetVaccinationController } from './pet-vaccination.controller';
import { PetVaccinationService } from './pet-vaccination.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('PetVaccinationController', () => {
  let controller: PetVaccinationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetVaccinationController],
      providers: [PrismaService, PetVaccinationService],
    }).compile();

    controller = module.get<PetVaccinationController>(PetVaccinationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
