import {
    Controller,
    Post,
    Request,
    UseGuards,
    Body,
    Get,
    Param,
    Delete,
    Patch,
    Query
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ItemsService } from './items.service';
import { AddItemDto } from './dto/add-item-dto';
import { ChangeItemDto } from './dto/change-item-dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({ summary: '아이템 추가' })
    addItem(@Request() req, @Body() addItemDto: AddItemDto) {
        const userId = req.user.sub;
        return this.itemsService.addItem(userId, addItemDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    @ApiOperation({ summary: '아이템 목록 취득' })
    checkItem(@Request() req, @Query('name') name: string, @Query('category') category: string, @Query('page') page: number) {
        const userId = req.user.sub;
        return this.itemsService.checkItem(userId, name, category, page);
    }

    @UseGuards(AuthGuard)
    @Get('count')
    @ApiOperation({ summary: '아이템 개수 취득' })
    getItemCount(@Request() req, @Query('name') name: string, @Query('category') category: string) {
        const userId = req.user.sub;
        return this.itemsService.getItemCount(userId, name, category);
    }

    @UseGuards(AuthGuard)
    @Delete(':name')
    @ApiOperation({ summary: '아이템 삭제' })
    deleteItem(@Request() req, @Param('name') name: string) {
        const userId = req.user.sub;
        return this.itemsService.deleteItem(userId, name);
    }

    @UseGuards(AuthGuard)
    @Get(':name')
    @ApiOperation({ summary: '아이템 취득' })
    checkOneItem(@Request() req, @Param('name') name: string) {
        const userId = req.user.sub;
        return this.itemsService.checkOneItem(userId, name);
    }

    @UseGuards(AuthGuard)
    @Patch(':name')
    @ApiOperation({ summary: '아이템 변경' })
    changeItem(@Request() req, @Param('name') name: string, @Body() changeItemDto: ChangeItemDto) {
        const userId = req.user.sub;
        return this.itemsService.changeItem(userId, name, changeItemDto);
    }
}
