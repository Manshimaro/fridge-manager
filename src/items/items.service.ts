import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AddItemDto } from './dto/add-item-dto';
import { ItemEntity } from './entity/item.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeItemDto } from './dto/change-item-dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemEntity) private itemsRepository: Repository<ItemEntity>,
    ) { }

    async addItem(userId: string, addItemDto: AddItemDto) {
        const { name, number, expDate, category } = addItemDto;
        
        await this.checkDuplication(userId, name);

        await this.insertItem(userId, name, number, expDate, category);
    }

    private async checkDuplication(userId: string, name: string): Promise<void> {
        const exist = await this.itemsRepository.findOne({
            where: { userId, name }
        });

        if (exist !== null) {
            throw new UnprocessableEntityException('해당 이름으로는 추가할 수 없습니다');
        }
    }

    private async insertItem(userId: string, name: string, number: number, expDate: string, category: string): Promise<void> {
        const item = new ItemEntity();
        item.userId = userId;
        item.name = name;
        item.number = number;
        item.expDate = expDate;
        item.category = category;
        await this.itemsRepository.insert(item);
    }

    async checkItem(userId: string, name: string, category: string, page: number): Promise<ItemEntity[]> {
        const items = await this.itemsRepository.find({
            where: { 
                userId, 
                name: Like(`%${name}%`), 
                category : category ? category : Like('%')
            },
            order: { expDate: 'ASC' },
            skip: (page - 1) * 5,
            take: 5,
        });
        return items;
    }

    async deleteItem(userId: string, name: string): Promise<void> {
        await this.itemsRepository.delete({
            userId, 
            name
        });
    }

    async checkOneItem(userId: string, name: string): Promise<ItemEntity> {
        const item = await this.itemsRepository.findOne({
            where: { userId, name }
        });
        return item;
    }

    async changeItem(userId: string, name: string, changeItemDto: ChangeItemDto) {
        const { number, expDate, category } = changeItemDto;

        const item = await this.itemsRepository.findOne({
            where: { userId, name }
        });

        if(!item) {
            throw new UnprocessableEntityException('존재하지 않는 이름입니다');
        }

        item.number = number;
        item.expDate = expDate;
        item.category = category;
        await this.itemsRepository.save(item);
    }

    async getItemCount(userId: string, name: string, category: string) {
        return this.itemsRepository.count({
            where: { 
                userId, 
                name: Like(`%${name}%`), 
                category : category ? category : Like('%')
            }
        });
    }
}
