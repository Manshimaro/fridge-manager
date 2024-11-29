import { IsString, MinLength, MaxLength, IsNumber, IsDate, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class AddItemDto {
    @MinLength(1)
    @MaxLength(30)
    @IsString()
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