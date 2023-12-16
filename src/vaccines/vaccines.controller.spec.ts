import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('VaccinesController', () => {
  let controller: VaccinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinesController],
      providers: [PrismaService, VaccinesService],
    }).compile();

    controller = module.get<VaccinesController>(VaccinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
