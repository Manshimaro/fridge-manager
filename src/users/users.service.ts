import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ChangeUserSettingDto } from './dto/change-user-setting-dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const { id, password, nickname } = createUserDto;

        await this.checkDuplication(id, nickname);

        await this.insertUser(id, password, nickname);
    }

    private async checkDuplication(id: string, nickname: string): Promise<void> {
        const idExist = await this.usersRepository.findOne({
            where: { id }
        });

        if (idExist !== null) {
            throw new UnprocessableEntityException('해당 ID로는 가입할 수 없습니다.');
        }

        const nicknameExist = await this.usersRepository.findOne({
            where: { nickname }
        });

        if (nicknameExist !== null) {
            throw new UnprocessableEntityException('해당 별명으로는 가입할 수 없습니다.');
        }
    }

    private async insertUser(id: string, password: string, nickname: string): Promise<void> {
        const user = new UserEntity();
        user.id = id;
        user.password = await bcrypt.hash(password, 10);
        user.nickname = nickname;
        await this.usersRepository.insert(user);
    }

    async findUserById(id: string): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({
            where: { id }
        });

        return user;
    }

    async changeUserSetting(id: string, changeUserSettingDto: ChangeUserSettingDto) {
        const { cautionDay } = changeUserSettingDto;

        const user = await this.usersRepository.findOne({
            where: { id }
        });

        if(!user) {
            throw new UnprocessableEntityException('존재하지 않는 ID입니다');
        }

        user.cautionDay = cautionDay;
        await this.usersRepository.save(user);
    }
}
