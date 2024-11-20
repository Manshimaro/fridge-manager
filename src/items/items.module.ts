import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entity/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemEntity]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
