import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { PrismaService } from './prisma/prisma.service';
import { VaccinesModule } from './vaccines/vaccines.module';

@Module({
  imports: [PetsModule, VaccinesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
