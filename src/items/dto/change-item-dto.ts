import { IsString, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class ChangeItemDto {
    @Type(() => Number)
    @IsPositive()
    @IsNumber()
    readonly number: number;

    @IsString()
    readonly expDate: string;
}