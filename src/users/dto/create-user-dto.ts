import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
    @MinLength(2)
    @MaxLength(20)
    @IsString()
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'ID는 영문자와 숫자만 허용됩니다.'
    })
    readonly id: string;

    @MinLength(8)
    @MaxLength(20)
    @IsString()
    readonly password: string;

    @MinLength(2)
    @MaxLength(20)
    @IsString()
    @Matches(/^[a-zA-Z0-9\uAC00-\uD7A3]*$/, {
        message: '별명은 영문자, 숫자, 그리고 한글만 허용됩니다.'
    })
    readonly nickname: string;
}