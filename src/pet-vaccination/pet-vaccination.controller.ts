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
import { PetVaccination } from '@prisma/client';
import { PetVaccinationService } from './pet-vaccination.service';
import { PaginatedList } from 'src/models/paginated-list.model';
import { PetVaccinationSchema } from './pet-vaccination.schema';
import { JoiValidationPipe } from 'src/joi-validation/joi-validation.pipe';

@Controller('pet-vaccination')
export class PetVaccinationController {
  constructor(private petVaccinationsService: PetVaccinationService) {}

  @Get()
  async getMany(
    @Query('pageIndex', new DefaultValuePipe(1), ParseIntPipe)
    pageIndex: number,
    @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe)
    pageSize: number,
  ): Promise<PaginatedList<PetVaccination>> {
    return await this.petVaccinationsService.getMany(pageIndex, pageSize);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<PetVaccination> {
    const petVaccination = await this.petVaccinationsService.getOne(id);

    if (!petVaccination) {
      throw new NotFoundException();
    }

    return petVaccination;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(PetVaccinationSchema))
  async post(@Body() petVaccination: PetVaccination): Promise<PetVaccination> {
    return await this.petVaccinationsService.create(petVaccination);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(PetVaccinationSchema))
  async put(@Param('id') id: string, @Body() petVaccination: PetVaccination) {
    const updated = await this.petVaccinationsService.update(
      id,
      petVaccination,
    );

    if (!updated) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.petVaccinationsService.delete(id);

    if (!deleted) {
      throw new NotFoundException();
    }
  }
}
