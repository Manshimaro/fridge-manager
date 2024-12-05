import { IsString, MinLength, MaxLength, IsNumber, IsPositive, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class AddItemDto {
    @MinLength(1)
    @MaxLength(30)
    @IsString()
    @Matches(/^[a-zA-Z0-9\uAC00-\uD7A3]*$/, {
        message: '이름은 영문자, 숫자, 그리고 한글만 허용됩니다.'
    })
    readonly name: string;

    @Type(() => Number)
    @IsPositive()
    @IsNumber()
    readonly number: number;

    @IsString()
    readonly expDate: string;

    @MaxLength(30)
    @IsString()
    readonly category: string;
}