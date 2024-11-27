import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class ChangeUserSettingDto {
    @Type(() => Number)
    @IsPositive()
    @IsNumber()
    readonly cautionDay: number;
}