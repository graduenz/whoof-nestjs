import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesService } from './vaccines.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { $Enums, Vaccine } from '@prisma/client';

describe('VaccinesService', () => {
  let service: VaccinesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, VaccinesService],
    }).compile();

    service = module.get<VaccinesService>(VaccinesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getOne', () => {
    it('should return a vaccine by id', async () => {
      const vaccineId = 'vaccine-id';
      const expectedVaccine: Vaccine = {
        id: vaccineId,
        name: 'COVID-19 Vaccine',
        description: 'A vaccine for COVID-19',
        duration: 360,
        petType: $Enums.PetType.DOG,
      };

      jest
        .spyOn(prismaService.vaccine, 'findUnique')
        .mockResolvedValue(expectedVaccine);

      const result = await service.getOne(vaccineId);

      expect(result).toEqual(expectedVaccine);
      expect(prismaService.vaccine.findUnique).toHaveBeenCalledWith({
        where: { id: vaccineId },
      });
    });

    it('should return null if no vaccine is found', async () => {
      const vaccineId = 'non-existent-id';

      jest.spyOn(prismaService.vaccine, 'findUnique').mockResolvedValue(null);

      const result = await service.getOne(vaccineId);

      expect(result).toBeNull();
      expect(prismaService.vaccine.findUnique).toHaveBeenCalledWith({
        where: { id: vaccineId },
      });
    });
  });

  describe('getMany', () => {
    it('should return a paginated list of vaccines', async () => {
      const pageIndex = 1;
      const pageSize = 10;
      const expectedVaccines: Vaccine[] = [
        {
          id: 'vaccine-id-1',
          name: 'COVID-19 Vaccine',
          description: 'A vaccine for COVID-19',
          duration: 360,
          petType: $Enums.PetType.DOG,
        },
        {
          id: 'vaccine-id-2',
          name: 'Flu Vaccine',
          description: 'A vaccine for the flu',
          duration: 360,
          petType: $Enums.PetType.DOG,
        },
      ];
      const expectedTotalCount = 2;

      jest
        .spyOn(prismaService.vaccine, 'findMany')
        .mockResolvedValue(expectedVaccines);
      jest
        .spyOn(prismaService.vaccine, 'count')
        .mockResolvedValue(expectedTotalCount);

      const result = await service.getMany(pageIndex, pageSize);

      expect(result.items).toEqual(expectedVaccines);
      expect(result.totalCount).toEqual(expectedTotalCount);
      expect(prismaService.vaccine.findMany).toHaveBeenCalledWith({
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
      });
      expect(prismaService.vaccine.count).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new vaccine with specified ID', async () => {
      const newVaccine: Vaccine = {
        id: 'new-vaccine-id',
        name: 'COVID-19 Vaccine',
        description: 'A vaccine for COVID-19',
        duration: 360,
        petType: $Enums.PetType.DOG,
      };
      const expectedCreatedVaccine: Vaccine = { ...newVaccine };

      jest
        .spyOn(prismaService.vaccine, 'create')
        .mockResolvedValue(expectedCreatedVaccine);

      const result = await service.create(newVaccine);

      expect(result).toEqual(expectedCreatedVaccine);
      expect(prismaService.vaccine.create).toHaveBeenCalledWith({
        data: newVaccine,
      });
    });

    it('should create a new vaccine without an ID', async () => {
      const newVaccine: Vaccine = {
        id: null,
        name: 'COVID-19 Vaccine',
        description: 'A vaccine for COVID-19',
        duration: 360,
        petType: $Enums.PetType.DOG,
      };
      const expectedCreatedVaccine: Vaccine = { ...newVaccine };

      jest
        .spyOn(prismaService.vaccine, 'create')
        .mockResolvedValue(expectedCreatedVaccine);

      const result = await service.create(newVaccine);

      expect(result).toEqual({ ...expectedCreatedVaccine, id: result.id });
      expect(result.id).not.toBeNull();
      expect(prismaService.vaccine.create).toHaveBeenCalledWith({
        data: newVaccine,
      });
    });
  });

  describe('update', () => {
    it('should update an existing vaccine', async () => {
      const vaccineId = 'vaccine-id';
      const updatedVaccine: Vaccine = {
        id: vaccineId,
        name: 'Updated COVID-19 Vaccine',
        description: 'A vaccine for COVID-19',
        duration: 360,
        petType: $Enums.PetType.DOG,
      };

      jest
        .spyOn(prismaService.vaccine, 'findUnique')
        .mockResolvedValue(updatedVaccine);

      jest
        .spyOn(prismaService.vaccine, 'update')
        .mockResolvedValue(updatedVaccine);

      const result = await service.update(vaccineId, updatedVaccine);

      expect(result).toBe(true);
      expect(prismaService.vaccine.update).toHaveBeenCalledWith({
        where: { id: vaccineId },
        data: updatedVaccine,
      });
    });

    it('should return false if the vaccine does not exist', async () => {
      const vaccineId = 'non-existent-id';
      const updatedVaccine: Vaccine = {
        id: vaccineId,
        name: 'Updated COVID-19 Vaccine',
        description: 'A vaccine for COVID-19',
        duration: 360,
        petType: $Enums.PetType.DOG,
      };

      jest.spyOn(prismaService.vaccine, 'findUnique').mockResolvedValue(null);

      jest.spyOn(prismaService.vaccine, 'update').mockResolvedValue(null);

      const result = await service.update(vaccineId, updatedVaccine);

      expect(result).toBe(false);
      expect(prismaService.vaccine.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete an existing vaccine', async () => {
      const vaccineId = 'vaccine-id';
      const deletedVaccine: Vaccine = {
        id: vaccineId,
        name: 'Updated COVID-19 Vaccine',
        description: 'A vaccine for COVID-19',
        duration: 360,
        petType: $Enums.PetType.DOG,
      };

      jest
        .spyOn(prismaService.vaccine, 'findUnique')
        .mockResolvedValue(deletedVaccine);

      jest
        .spyOn(prismaService.vaccine, 'delete')
        .mockResolvedValue(deletedVaccine);

      const result = await service.delete(vaccineId);

      expect(result).toBe(true);
      expect(prismaService.vaccine.delete).toHaveBeenCalledWith({
        where: { id: vaccineId },
      });
    });

    it('should return false if the vaccine does not exist', async () => {
      const vaccineId = 'non-existent-id';

      jest.spyOn(prismaService.vaccine, 'findUnique').mockResolvedValue(null);

      jest.spyOn(prismaService.vaccine, 'delete').mockResolvedValue(null);

      const result = await service.delete(vaccineId);

      expect(result).toBe(false);
      expect(prismaService.vaccine.delete).not.toHaveBeenCalled();
    });
  });
});
