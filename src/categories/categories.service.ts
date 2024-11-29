import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { AddCategoryDto } from './dto/add-category-dto';
import { ItemEntity } from 'src/items/entity/item.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>,
        @InjectRepository(ItemEntity) private itemsRepository: Repository<ItemEntity>,
    ) { }

    async findAll(userId: string): Promise<CategoryEntity[]> {
        const categories = this.categoriesRepository.find({
            where: { userId }
        });
        return categories;
    }

    async create(userId: string, addCategoryDto: AddCategoryDto) {
        const { name } = addCategoryDto;
        
        await this.checkDuplication(userId, name);

        await this.insertCategory(userId, name);
    }

    private async checkDuplication(userId: string, name: string): Promise<void> {
        const exist = await this.categoriesRepository.findOne({
            where: { userId, name }
        });

        if (exist !== null) {
            throw new UnprocessableEntityException('해당 이름으로는 추가할 수 없습니다');
        }
    }

    private async insertCategory(userId: string, name: string): Promise<void> {
        const category = new CategoryEntity();
        category.userId = userId;
        category.name = name;
        await this.categoriesRepository.insert(category);
    }

    async delete(userId: string, name: string): Promise<void> {
        await this.categoriesRepository.delete({
            userId, 
            name
        });

        await this.itemsRepository.update(
            { userId, category: name },
            { category: "" }
        );
    }
}
