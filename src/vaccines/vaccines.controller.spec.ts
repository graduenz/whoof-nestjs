import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedList } from 'src/models/paginated-list.model';
import { $Enums, Vaccine } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('VaccinesController', () => {
  let controller: VaccinesController;
  let service: VaccinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinesController],
      providers: [PrismaService, VaccinesService],
    }).compile();

    controller = module.get<VaccinesController>(VaccinesController);
    service = module.get<VaccinesService>(VaccinesService);
  });

  describe('getMany', () => {
    it('should return a paginated list of vaccines', async () => {
      const pageIndex = 1;
      const pageSize = 20;
      const expectedVaccines: PaginatedList<Vaccine> = {
        items: [
          {
            id: '1',
            name: 'Vaccine A for Dogs',
            description: null,
            duration: 360,
            petType: $Enums.PetType.DOG,
          },
          {
            id: '2',
            name: 'Vaccine B for Cats',
            description: null,
            duration: 720,
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

      jest.spyOn(service, 'getMany').mockResolvedValue(expectedVaccines);

      const result = await controller.getMany(pageIndex, pageSize);

      expect(result).toEqual(expectedVaccines);
    });
  });

  describe('getOne', () => {
    it('should return a vaccine by ID', async () => {
      const id = '1';
      const expectedVaccine: Vaccine = {
        id,
        name: 'Vaccine A for Dogs',
        description: null,
        duration: 360,
        petType: $Enums.PetType.DOG,
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(expectedVaccine);

      const result = await controller.getOne(id);

      expect(result).toEqual(expectedVaccine);
    });

    it('should throw when a vaccine by ID is not found', async () => {
      const id = '1';

      jest.spyOn(service, 'getOne').mockResolvedValue(undefined);

      expect(controller.getOne(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('post', () => {
    it('should create a new vaccine', async () => {
      const vaccine: Vaccine = {
        id: '1',
        name: 'Vaccine A for Dogs',
        description: null,
        duration: 360,
        petType: $Enums.PetType.DOG,
      };
      const expectedVaccine: Vaccine = { ...vaccine };

      jest.spyOn(service, 'create').mockResolvedValue(expectedVaccine);

      const result = await controller.post(vaccine);

      expect(result).toEqual(expectedVaccine);
    });
  });

  describe('put', () => {
    it('should update a vaccine by ID', async () => {
      const id = '1';
      const vaccine: Vaccine = {
        id: '1',
        name: 'Vaccine A for Dogs',
        description: null,
        duration: 360,
        petType: $Enums.PetType.DOG,
      };

      jest.spyOn(service, 'update').mockResolvedValue(true);

      await controller.put(id, vaccine);

      expect(service.update).toHaveBeenCalledWith(id, vaccine);
    });

    it('should throw when a vaccine by ID is not found', async () => {
      const id = '1';
      const vaccine: Vaccine = {
        id: '1',
        name: 'Vaccine A for Dogs',
        description: null,
        duration: 360,
        petType: $Enums.PetType.DOG,
      };

      jest.spyOn(service, 'update').mockResolvedValue(false);

      expect(controller.put(id, vaccine)).rejects.toThrowError(
        NotFoundException,
      );

      expect(service.update).toHaveBeenCalledWith(id, vaccine);
    });
  });

  describe('delete', () => {
    it('should delete a vaccine by ID', async () => {
      const id = '1';

      jest.spyOn(service, 'delete').mockResolvedValue(true);

      await controller.delete(id);

      expect(service.delete).toHaveBeenCalledWith(id);
    });

    it('should throw when a vaccine by ID is not found', async () => {
      const id = '1';

      jest.spyOn(service, 'delete').mockResolvedValue(false);

      expect(controller.delete(id)).rejects.toThrowError(NotFoundException);

      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
