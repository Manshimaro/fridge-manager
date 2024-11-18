import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @MinLength(2)
    @MaxLength(20)
    @IsString()
    readonly id: string;

    @MinLength(8)
    @MaxLength(20)
    @IsString()
    readonly password: string;

    @MinLength(2)
    @MaxLength(20)
    @IsString()
    readonly nickname: string;
}