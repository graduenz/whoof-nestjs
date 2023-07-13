import { Test, TestingModule } from '@nestjs/testing';
import { PetVaccinationController } from './pet-vaccination.controller';

describe('PetVaccinationController', () => {
  let controller: PetVaccinationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetVaccinationController],
    }).compile();

    controller = module.get<PetVaccinationController>(PetVaccinationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
