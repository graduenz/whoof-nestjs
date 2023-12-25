import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from './pets.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { $Enums, Pet } from '@prisma/client';

describe('PetsService', () => {
  let service: PetsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsService, PrismaService],
    }).compile();

    service = module.get<PetsService>(PetsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOne', () => {
    it('should return a pet by ID', async () => {
      const petId = '123';
      const expectedPet: Pet = {
        id: petId,
        name: 'Scooby-Doo',
        petType: $Enums.PetType.DOG,
      };

      jest
        .spyOn(prismaService.pet, 'findUnique')
        .mockResolvedValue(expectedPet);

      const result = await service.getOne(petId);

      expect(result).toEqual(expectedPet);
      expect(prismaService.pet.findUnique).toHaveBeenCalledWith({
        where: { id: petId },
      });
    });

    it('should return null if pet is not found', async () => {
      const petId = '123';

      jest.spyOn(prismaService.pet, 'findUnique').mockResolvedValue(null);

      const result = await service.getOne(petId);

      expect(result).toBeNull();
      expect(prismaService.pet.findUnique).toHaveBeenCalledWith({
        where: { id: petId },
      });
    });
  });

  describe('getMany', () => {
    it('should return a paginated list of pets', async () => {
      const pageIndex = 1;
      const pageSize = 10;
      const expectedPets: Pet[] = [
        { id: '1', name: 'Scooby-Doo', petType: $Enums.PetType.DOG },
        { id: '2', name: 'Bella', petType: $Enums.PetType.CAT },
      ];
      const expectedTotalCount = 2;

      jest.spyOn(prismaService.pet, 'findMany').mockResolvedValue(expectedPets);
      jest
        .spyOn(prismaService.pet, 'count')
        .mockResolvedValue(expectedTotalCount);

      const result = await service.getMany(pageIndex, pageSize);

      expect(result.items).toEqual(expectedPets);
      expect(result.totalCount).toEqual(expectedTotalCount);
      expect(prismaService.pet.findMany).toHaveBeenCalledWith({
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
      });
      expect(prismaService.pet.count).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new pet with specified ID', async () => {
      const newPet: Pet = {
        id: '1',
        name: 'Scooby-Doo',
        petType: $Enums.PetType.DOG,
      };
      const expectedCreatedPet: Pet = { ...newPet };

      jest
        .spyOn(prismaService.pet, 'create')
        .mockResolvedValue(expectedCreatedPet);

      const result = await service.create(newPet);

      expect(result).toEqual(expectedCreatedPet);
      expect(prismaService.pet.create).toHaveBeenCalledWith({ data: newPet });
    });

    it('should create a new pet without an ID', async () => {
      const newPet: Pet = {
        id: null,
        name: 'Scooby-Doo',
        petType: $Enums.PetType.DOG,
      };
      const expectedCreatedPet: Pet = { ...newPet };

      jest
        .spyOn(prismaService.pet, 'create')
        .mockResolvedValue(expectedCreatedPet);

      const result = await service.create(newPet);

      expect(result).toEqual({ ...expectedCreatedPet, id: result.id });
      expect(result.id).not.toBeNull();
      expect(prismaService.pet.create).toHaveBeenCalledWith({ data: newPet });
    });
  });

  describe('update', () => {
    it('should update a pet by ID', async () => {
      const petId = '1';
      const updatedPet: Pet = {
        id: petId,
        name: 'Scooby-Doo',
        petType: $Enums.PetType.DOG,
      };

      jest.spyOn(prismaService.pet, 'update').mockResolvedValue(updatedPet);

      jest.spyOn(prismaService.pet, 'findUnique').mockResolvedValue(updatedPet);

      const result = await service.update(petId, updatedPet);

      expect(result).toBe(true);
      expect(prismaService.pet.update).toHaveBeenCalledWith({
        where: { id: petId },
        data: updatedPet,
      });
    });

    it('should return false if pet is not found', async () => {
      const petId = '1';
      const updatedPet: Pet = {
        id: petId,
        name: 'Scooby-Doo',
        petType: $Enums.PetType.DOG,
      };

      jest.spyOn(prismaService.pet, 'update').mockResolvedValue(null);

      jest.spyOn(prismaService.pet, 'findUnique').mockResolvedValue(null);

      const result = await service.update(petId, updatedPet);

      expect(result).toBe(false);
      expect(prismaService.pet.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a pet by ID', async () => {
      const petId = '1';
      const deletedPet: Pet = {
        id: petId,
        name: 'Scooby-Doo',
        petType: $Enums.PetType.DOG,
      };

      jest.spyOn(prismaService.pet, 'delete').mockResolvedValue(deletedPet);

      jest.spyOn(prismaService.pet, 'findUnique').mockResolvedValue(deletedPet);

      const result = await service.delete(petId);

      expect(result).toBe(true);
      expect(prismaService.pet.delete).toHaveBeenCalledWith({
        where: { id: petId },
      });
    });

    it('should return false if pet is not found', async () => {
      const petId = '1';

      jest.spyOn(prismaService.pet, 'delete').mockResolvedValue(null);

      jest.spyOn(prismaService.pet, 'findUnique').mockResolvedValue(null);

      const result = await service.delete(petId);

      expect(result).toBe(false);
      expect(prismaService.pet.delete).not.toHaveBeenCalled();
    });
  });
});
