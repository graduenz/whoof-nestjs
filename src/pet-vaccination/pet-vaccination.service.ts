import { Injectable } from '@nestjs/common';
import { PetVaccination } from '@prisma/client';
import { ulid } from 'ulid';
import { PaginatedList } from 'src/models/paginated-list.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetVaccinationService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string): Promise<PetVaccination | null> {
    return await this.prisma.petVaccination.findUnique({
      where: {
        id,
      },
    });
  }

  async getMany(
    pageIndex: number,
    pageSize: number,
  ): Promise<PaginatedList<PetVaccination>> {
    const count = await this.prisma.petVaccination.count();
    const data = await this.prisma.petVaccination.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedList<PetVaccination>(data, count, pageIndex, pageSize);
  }

  async create(petVaccination: PetVaccination): Promise<PetVaccination> {
    if (!petVaccination.id) {
      petVaccination.id = ulid();
    }

    await this.prisma.petVaccination.create({
      data: petVaccination,
    });

    return petVaccination;
  }

  async update(id: string, petVaccination: PetVaccination): Promise<boolean> {
    const existing = await this.getOne(id);
    if (!existing) {
      return false;
    }

    await this.prisma.petVaccination.update({
      where: {
        id,
      },
      data: petVaccination,
    });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.getOne(id);
    if (!existing) {
      return false;
    }

    await this.prisma.petVaccination.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
