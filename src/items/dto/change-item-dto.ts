import { IsString, IsNumber, IsPositive, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class ChangeItemDto {
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