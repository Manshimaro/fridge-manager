import { IsString, MinLength, MaxLength } from 'class-validator';

export class AddCategoryDto {
    @MinLength(1)
    @MaxLength(30)
    @IsString()
    readonly name: string;
}