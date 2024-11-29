import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Item')
export class ItemEntity {
    @PrimaryColumn({ length: 20 })
    userId: string;

    @PrimaryColumn({ length: 30 })
    name: string;

    @Column()
    number: number;

    @Column({ type: 'date' })
    expDate: string;

    @Column({ length: 30 })
    category: string;
}