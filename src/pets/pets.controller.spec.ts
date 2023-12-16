import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedList } from 'src/models/paginated-list.model';
import { $Enums, Pet } from '@prisma/client';

describe('PetsController', () => {
  let controller: PetsController;
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [PrismaService, PetsService],
    }).compile();

    controller = module.get<PetsController>(PetsController);
    service = module.get<PetsService>(PetsService);
  });

  describe('getMany', () => {
    it('should return a paginated list of pets', async () => {
      const pageIndex = 1;
      const pageSize = 20;
      const expectedPets: PaginatedList<Pet> = {
        items: [
          {
            id: '1',
            name: 'Eminem',
            petType: $Enums.PetType.DOG,
          },
          {
            id: '2',
            name: 'Kitty',
            petType: $Enums.PetType.CAT,
          },
        ],
        totalCount: 2,
        hasNextPage: false,
        hasPreviousPage: false,
        totalPages: 1,
        pageIndex,
        pageSize,
      };

      jest.spyOn(service, 'getMany').mockResolvedValue(expectedPets);

      const result = await controller.getMany(pageIndex, pageSize);

      expect(result).toEqual(expectedPets);
    });
  });

  describe('getOne', () => {
    it('should return a pet by id', async () => {
      const id = '1';
      const expectedPet: Pet = {
        id,
        name: 'Eminem',
        petType: $Enums.PetType.DOG,
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(expectedPet);

      const result = await controller.getOne(id);

      expect(result).toEqual(expectedPet);
    });
  });

  describe('post', () => {
    it('should create a new pet', async () => {
      const pet: Pet = {
        id: '1',
        name: 'Eminem',
        petType: $Enums.PetType.DOG,
      };
      const expectedPet: Pet = { ...pet };

      jest.spyOn(service, 'create').mockResolvedValue(expectedPet);

      const result = await controller.post(pet);

      expect(result).toEqual(expectedPet);
    });
  });

  describe('put', () => {
    it('should update a pet by id', async () => {
      const id = '1';
      const pet: Pet = {
        id: '1',
        name: 'Eminem',
        petType: $Enums.PetType.DOG,
      };

      jest.spyOn(service, 'update').mockResolvedValue(true);

      await controller.put(id, pet);

      expect(service.update).toHaveBeenCalledWith(id, pet);
    });
  });

  describe('delete', () => {
    it('should delete a pet by id', async () => {
      const id = '1';

      jest.spyOn(service, 'delete').mockResolvedValue(true);

      await controller.delete(id);

      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
