import { Test, TestingModule } from '@nestjs/testing';
import { PetVaccinationService } from './pet-vaccination.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PetVaccination } from '@prisma/client';

describe('PetVaccinationService', () => {
  let service: PetVaccinationService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PetVaccinationService],
    }).compile();

    service = module.get<PetVaccinationService>(PetVaccinationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getOne', () => {
    it('should return a pet vaccination by id', async () => {
      const mockPetVaccination: PetVaccination = {
        id: '1',
        petId: '1',
        vaccineId: '1',
        appliedAt: new Date(),
      };

      jest
        .spyOn(prismaService.petVaccination, 'findUnique')
        .mockResolvedValueOnce(mockPetVaccination);

      const result = await service.getOne('1');

      expect(result).toEqual(mockPetVaccination);
      expect(prismaService.petVaccination.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null if pet vaccination is not found', async () => {
      jest
        .spyOn(prismaService.petVaccination, 'findUnique')
        .mockResolvedValueOnce(null);

      const result = await service.getOne('1');

      expect(result).toBeNull();
      expect(prismaService.petVaccination.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('getMany', () => {
    it('should return a paginated list of pet vaccinations', async () => {
      const expectedPetVaccination: PetVaccination[] = [
        {
          id: '1',
          petId: '1',
          vaccineId: '1',
          appliedAt: new Date(),
        },
      ];
      const expectedTotalCount = 1;

      jest
        .spyOn(prismaService.petVaccination, 'findMany')
        .mockResolvedValueOnce(expectedPetVaccination);
      jest
        .spyOn(prismaService.petVaccination, 'count')
        .mockResolvedValueOnce(expectedTotalCount);

      const result = await service.getMany(1, 10);

      expect(result.items).toEqual(expectedPetVaccination);
      expect(result.totalCount).toEqual(expectedTotalCount);
      expect(prismaService.petVaccination.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
      expect(prismaService.petVaccination.count).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new pet vaccination with specified ID', async () => {
      const mockPetVaccination: PetVaccination = {
        id: '1',
        petId: '1',
        vaccineId: '1',
        appliedAt: new Date(),
      };

      jest
        .spyOn(prismaService.petVaccination, 'create')
        .mockResolvedValueOnce(mockPetVaccination);

      const result = await service.create(mockPetVaccination);

      expect(result).toEqual(mockPetVaccination);
      expect(prismaService.petVaccination.create).toHaveBeenCalledWith({
        data: mockPetVaccination,
      });
    });

    it('should create a new pet vaccination without an ID', async () => {
      const mockPetVaccination: PetVaccination = {
        id: null,
        petId: '1',
        vaccineId: '1',
        appliedAt: new Date(),
      };

      jest
        .spyOn(prismaService.petVaccination, 'create')
        .mockResolvedValueOnce(mockPetVaccination);

      const result = await service.create(mockPetVaccination);

      expect(result).toEqual({ ...mockPetVaccination, id: result.id });
      expect(result.id).not.toBeNull();
      expect(prismaService.petVaccination.create).toHaveBeenCalledWith({
        data: mockPetVaccination,
      });
    });
  });

  describe('update', () => {
    it('should update an existing pet vaccination', async () => {
      const mockPetVaccination: PetVaccination = {
        id: '1',
        petId: '1',
        vaccineId: '1',
        appliedAt: new Date(),
      };

      jest
        .spyOn(prismaService.petVaccination, 'update')
        .mockResolvedValueOnce(mockPetVaccination);

      jest
        .spyOn(prismaService.petVaccination, 'findUnique')
        .mockResolvedValue(mockPetVaccination);

      const result = await service.update('1', mockPetVaccination);

      expect(result).toBe(true);
      expect(prismaService.petVaccination.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: mockPetVaccination,
      });
    });

    it('should return false if pet vaccination is not found', async () => {
      jest
        .spyOn(prismaService.petVaccination, 'update')
        .mockResolvedValueOnce(null);

      jest
        .spyOn(prismaService.petVaccination, 'findUnique')
        .mockResolvedValue(null);

      const result = await service.update('1', {} as PetVaccination);

      expect(result).toBe(false);
      expect(prismaService.petVaccination.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete an existing pet vaccination', async () => {
      const deletedPetVaccination: PetVaccination = {
        id: '1',
        petId: '1',
        vaccineId: '1',
        appliedAt: new Date(),
      };

      jest
        .spyOn(prismaService.petVaccination, 'delete')
        .mockResolvedValueOnce(deletedPetVaccination);

      jest
        .spyOn(prismaService.petVaccination, 'findUnique')
        .mockResolvedValue(deletedPetVaccination);

      const result = await service.delete('1');

      expect(result).toBe(true);
      expect(prismaService.petVaccination.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return false if pet vaccination is not found', async () => {
      jest
        .spyOn(prismaService.petVaccination, 'delete')
        .mockResolvedValueOnce(null);

      jest
        .spyOn(prismaService.petVaccination, 'findUnique')
        .mockResolvedValue(null);

      const result = await service.delete('1');

      expect(result).toBe(false);
      expect(prismaService.petVaccination.delete).not.toHaveBeenCalled();
    });
  });
});
