import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity('User')
export class UserEntity {
    @PrimaryColumn({ length: 20 })
    id: string;

    @Column({ length: 60 })
    password: string;

    @Column({ length: 20 })
    @Unique('UQ_NICKNAME', ['nickname'])
    nickname: string;
}