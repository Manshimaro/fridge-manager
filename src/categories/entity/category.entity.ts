import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Category')
export class CategoryEntity {
    @PrimaryColumn({ length: 20 })
    userId: string;

    @PrimaryColumn({ length: 30 })
    name: string;
}