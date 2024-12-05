import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AddCategoryDto {
    @MinLength(1)
    @MaxLength(30)
    @IsString()
    @Matches(/^[a-zA-Z0-9\uAC00-\uD7A3]*$/, {
        message: '이름은 영문자, 숫자, 그리고 한글만 허용됩니다.'
    })
    readonly name: string;
}