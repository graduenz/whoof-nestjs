import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Pet } from '@prisma/client';
import { PetsService } from './pets.service';
import { PaginatedList } from 'src/models/paginated-list.model';
import { PetSchema } from './schema/pet.schema';
import { JoiValidationPipe } from 'src/joi-validation/joi-validation.pipe';

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Get()
  async getMany(
    @Query('pageIndex', new DefaultValuePipe(1), ParseIntPipe)
    pageIndex: number,
    @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe)
    pageSize: number,
  ): Promise<PaginatedList<Pet>> {
    return await this.petsService.getMany(pageIndex, pageSize);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Pet> {
    const pet = await this.petsService.getOne(id);

    if (!pet) {
      throw new NotFoundException();
    }

    return pet;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(PetSchema))
  async post(@Body() pet: Pet): Promise<Pet> {
    return await this.petsService.create(pet);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(PetSchema))
  async put(@Param('id') id: string, @Body() pet: Pet) {
    const updated = await this.petsService.update(id, pet);

    if (!updated) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.petsService.delete(id);

    if (!deleted) {
      throw new NotFoundException();
    }
  }
}
