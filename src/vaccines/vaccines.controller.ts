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
import { Vaccine } from '@prisma/client';
import { VaccinesService } from './vaccines.service';
import { PaginatedList } from 'src/models/paginated-list.model';
import { VaccineSchema } from './vaccine.schema';
import { JoiValidationPipe } from 'src/joi-validation/joi-validation.pipe';

@Controller('vaccines')
export class VaccinesController {
  constructor(private vaccinesService: VaccinesService) {}

  @Get()
  async getMany(
    @Query('pageIndex', new DefaultValuePipe(1), ParseIntPipe)
    pageIndex: number,
    @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe)
    pageSize: number,
  ): Promise<PaginatedList<Vaccine>> {
    return await this.vaccinesService.getMany(pageIndex, pageSize);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Vaccine> {
    const vaccine = await this.vaccinesService.getOne(id);

    if (!vaccine) {
      throw new NotFoundException();
    }

    return vaccine;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(VaccineSchema))
  async post(@Body() vaccine: Vaccine): Promise<Vaccine> {
    return await this.vaccinesService.create(vaccine);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(VaccineSchema))
  async put(@Param('id') id: string, @Body() vaccine: Vaccine) {
    const updated = await this.vaccinesService.update(id, vaccine);

    if (!updated) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.vaccinesService.delete(id);

    if (!deleted) {
      throw new NotFoundException();
    }
  }
}
