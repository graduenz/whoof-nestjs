import { Test, TestingModule } from '@nestjs/testing';
import { PetVaccinationController } from './pet-vaccination.controller';
import { PetVaccinationService } from './pet-vaccination.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedList } from 'src/models/paginated-list.model';
import { PetVaccination } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('PetVaccinationController', () => {
  let controller: PetVaccinationController;
  let service: PetVaccinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetVaccinationController],
      providers: [PrismaService, PetVaccinationService],
    }).compile();

    controller = module.get<PetVaccinationController>(PetVaccinationController);
    service = module.get<PetVaccinationService>(PetVaccinationService);
  });

  describe('getMany', () => {
    it('should return a paginated list of pet vaccinations', async () => {
      const pageIndex = 1;
      const pageSize = 20;
      const expectedResult: PaginatedList<PetVaccination> = {
        items: [
          {
            id: '1',
            appliedAt: new Date(),
            petId: '1',
            vaccineId: '1',
          },
          {
            id: '2',
            appliedAt: new Date(),
            petId: '2',
            vaccineId: '2',
          },
        ],
        totalCount: 2,
        hasNextPage: false,
        hasPreviousPage: false,
        totalPages: 1,
        pageIndex,
        pageSize,
      };

      jest.spyOn(service, 'getMany').mockResolvedValue(expectedResult);

      const result = await controller.getMany(pageIndex, pageSize);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getOne', () => {
    it('should return a pet vaccination by ID', async () => {
      const id = '1';
      const expectedResult: PetVaccination = {
        id: '1',
        appliedAt: new Date(),
        petId: '1',
        vaccineId: '1',
      };

      jest.spyOn(service, 'getOne').mockResolvedValue(expectedResult);

      const result = await controller.getOne(id);

      expect(result).toEqual(expectedResult);
    });

    it('should throw when a pet vaccination by ID is not found', async () => {
      const id = '1';

      jest.spyOn(service, 'getOne').mockResolvedValue(undefined);

      expect(controller.getOne(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('post', () => {
    it('should create a new pet vaccination', async () => {
      const petVaccination: PetVaccination = {
        id: '1',
        appliedAt: new Date(),
        petId: '1',
        vaccineId: '1',
      };
      const expectedResult: PetVaccination = { ...petVaccination };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.post(petVaccination);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('put', () => {
    it('should update a pet vaccination by ID', async () => {
      const id = '1';
      const petVaccination: PetVaccination = {
        id: '1',
        appliedAt: new Date(),
        petId: '1',
        vaccineId: '1',
      };

      jest.spyOn(service, 'update').mockResolvedValue(true);

      await controller.put(id, petVaccination);

      expect(service.update).toHaveBeenCalledWith(id, petVaccination);
    });

    it('should throw when a pet vaccination by ID is not found', async () => {
      const id = '1';
      const petVaccination: PetVaccination = {
        id: '1',
        appliedAt: new Date(),
        petId: '1',
        vaccineId: '1',
      };

      jest.spyOn(service, 'update').mockResolvedValue(false);

      expect(controller.put(id, petVaccination)).rejects.toThrowError(
        NotFoundException,
      );

      expect(service.update).toHaveBeenCalledWith(id, petVaccination);
    });
  });

  describe('delete', () => {
    it('should delete a pet vaccination by ID', async () => {
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
