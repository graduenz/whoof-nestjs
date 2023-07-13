import { Test, TestingModule } from '@nestjs/testing';
import { PetVaccinationService } from './pet-vaccination.service';

describe('PetVaccinationService', () => {
  let service: PetVaccinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetVaccinationService],
    }).compile();

    service = module.get<PetVaccinationService>(PetVaccinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
