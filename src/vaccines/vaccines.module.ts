import { Module } from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { VaccinesController } from './vaccines.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VaccinesService, PrismaService],
  controllers: [VaccinesController],
})
export class VaccinesModule {}
