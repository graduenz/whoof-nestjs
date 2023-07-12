import { Injectable } from '@nestjs/common';
import { Pet } from '@prisma/client';
import { ulid } from 'ulid';
import { PaginatedList } from 'src/models/paginated-list.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string): Promise<Pet | null> {
    return await this.prisma.pet.findUnique({
      where: {
        id,
      },
    });
  }

  async getMany(
    pageIndex: number,
    pageSize: number,
  ): Promise<PaginatedList<Pet>> {
    const count = await this.prisma.pet.count();
    const data = await this.prisma.pet.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedList<Pet>(data, count, pageIndex, pageSize);
  }

  async create(pet: Pet): Promise<Pet> {
    if (!pet.id) {
      pet.id = ulid();
    }

    await this.prisma.pet.create({
      data: pet,
    });

    return pet;
  }

  async update(id: string, pet: Pet): Promise<boolean> {
    const existing = await this.getOne(id);
    if (!existing) {
      return false;
    }

    await this.prisma.pet.update({
      where: {
        id,
      },
      data: pet,
    });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.getOne(id);
    if (!existing) {
      return false;
    }

    await this.prisma.pet.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
