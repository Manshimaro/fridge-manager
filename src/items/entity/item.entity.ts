import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Item')
export class ItemEntity {
    @PrimaryColumn({ length: 20 })
    userId: string;

    @PrimaryColumn({ length: 30 })
    name: string;

    @Column()
    number: number;

    @Column()
    expDate: Date;
}