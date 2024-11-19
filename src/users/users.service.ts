import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const { id, password, nickname } = createUserDto;

        await this.checkDuplication(id, nickname);

        await this.insertUser(id, password, nickname);
        
        // TODO 로그인 페이지로 이동
        return "회원 가입 성공!";
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
        // TODO 패스워드 암호화(by bcrypt library)
        user.password = password;
        user.nickname = nickname;
        await this.usersRepository.insert(user);
    }

    async findUserById(id: string): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({
            where: { id }
        });

        return user;
    }
}
