import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AddItemDto } from './dto/add-item-dto';
import { ItemEntity } from './entity/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemEntity) private itemsRepository: Repository<ItemEntity>,
    ) { }

    async addItem(userId: string, addItemDto: AddItemDto) {
        const { name, number, expDate } = addItemDto;
        
        await this.checkDuplication(userId, name);

        await this.insertItem(userId, name, number, expDate);
    }

    private async checkDuplication(userId: string, name: string): Promise<void> {
        const exist = await this.itemsRepository.findOne({
            where: { userId, name }
        });

        if (exist !== null) {
            throw new UnprocessableEntityException('해당 이름으로는 추가할 수 없습니다');
        }
    }

    private async insertItem(userId: string, name: string, number: number, expDate: string): Promise<void> {
        const item = new ItemEntity();
        item.userId = userId;
        item.name = name;
        item.number = number;
        item.expDate = expDate;
        await this.itemsRepository.insert(item);
    }

    async checkItem(userId: string): Promise<ItemEntity[]> {
        const items = await this.itemsRepository.find({
            where: { userId }
        });
        return items;
    }

    async deleteItem(userId: string, name: string): Promise<void> {
        await this.itemsRepository.delete({
            userId, 
            name
        });
    }
}
