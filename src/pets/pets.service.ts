import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { PaginatedList } from 'src/models/paginated-list.model';
import { Pet } from './interfaces/pet.interface';

@Injectable()
export class PetsService {
  private readonly pets: Pet[] = [];

  getOne(id: string): Pet | undefined {
    return this.pets.find((p) => p.id === id);
  }

  getMany(pageIndex: number, pageSize: number): PaginatedList<Pet> {
    const startsAt = (pageIndex - 1) * pageSize;
    const endsAt = startsAt + pageSize;

    return new PaginatedList<Pet>(
      this.pets.slice(startsAt, endsAt),
      this.pets.length,
      pageIndex,
      pageSize,
    );
  }

  create(pet: Pet): Pet {
    if (!pet.id) {
      pet.id = ulid();
    }

    this.pets.push(pet);
    return pet;
  }

  update(id: string, pet: Pet): boolean {
    const idx = this.pets.findIndex((p) => p.id === id);

    if (idx < 0) {
      return false;
    }

    pet.id = id;
    this.pets[idx] = pet;
    return true;
  }

  delete(id: string): boolean {
    const idx = this.pets.findIndex((p) => p.id === id);

    if (idx < 0) {
      return false;
    }

    this.pets.splice(idx, 1);
    return true;
  }
}
