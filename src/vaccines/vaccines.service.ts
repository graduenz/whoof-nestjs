import { Injectable } from '@nestjs/common';
import { Vaccine } from '@prisma/client';
import { ulid } from 'ulid';
import { PaginatedList } from 'src/models/paginated-list.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VaccinesService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string): Promise<Vaccine | null> {
    return await this.prisma.vaccine.findUnique({
      where: {
        id,
      },
    });
  }

  async getMany(
    pageIndex: number,
    pageSize: number,
  ): Promise<PaginatedList<Vaccine>> {
    const count = await this.prisma.vaccine.count();
    const data = await this.prisma.vaccine.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedList<Vaccine>(data, count, pageIndex, pageSize);
  }

  async create(vaccine: Vaccine): Promise<Vaccine> {
    if (!vaccine.id) {
      vaccine.id = ulid();
    }

    await this.prisma.vaccine.create({
      data: vaccine,
    });

    return vaccine;
  }

  async update(id: string, vaccine: Vaccine): Promise<boolean> {
    const existing = await this.getOne(id);
    if (!existing) {
      return false;
    }

    await this.prisma.vaccine.update({
      where: {
        id,
      },
      data: vaccine,
    });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.getOne(id);
    if (!existing) {
      return false;
    }

    await this.prisma.vaccine.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
