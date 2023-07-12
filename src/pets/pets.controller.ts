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
import { PetsService } from './pets.service';
import { PaginatedList } from 'src/models/paginated-list.model';
import { Pet, PetSchema } from './interfaces/pet.interface';
import { JoiValidationPipe } from 'src/joi-validation/joi-validation.pipe';

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Get()
  getMany(
    @Query('pageIndex', new DefaultValuePipe(1), ParseIntPipe)
    pageIndex: number,
    @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe)
    pageSize: number,
  ): PaginatedList<Pet> {
    return this.petsService.getMany(pageIndex, pageSize);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Pet {
    const pet = this.petsService.getOne(id);

    if (!pet) {
      throw new NotFoundException();
    }

    return pet;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(PetSchema))
  post(@Body() pet: Pet): Pet {
    return this.petsService.create(pet);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(PetSchema))
  put(@Param('id') id: string, @Body() pet: Pet) {
    const updated = this.petsService.update(id, pet);

    if (!updated) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const deleted = this.petsService.delete(id);

    if (!deleted) {
      throw new NotFoundException();
    }
  }
}
