import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entity/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from 'src/items/entity/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, ItemEntity]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
