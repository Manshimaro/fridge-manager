import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto) {
        const { id, password } = loginDto;

        // 사용자 인증 로직(DB 조회)
        const user = await this.validateUser(id, password);
        if (!user) {
            throw new UnauthorizedException('ID 또는 패스워드가 잘못되었습니다.');
        }

        // JWT 발급
        const payload = {
            sub: user.id,
            nickname: user.nickname,
        };
        const token = await this.jwtService.signAsync(payload);
        return { token, redirectUrl: '/dashboard' };
    }

    private async validateUser(id: string, password: string): Promise<UserEntity> {
        // DB 조회
        const user = await this.usersService.findUserById(id);
        // TODO password 대조 시, 암호화된 값을 대조하도록 변경
        if (!user || user.password !== password) {
            return null;
        }
        return user;
    }
}
