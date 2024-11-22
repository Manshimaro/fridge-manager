import {
    Controller,
    Post,
    Request,
    UseGuards,
    Body,
    Get,
    Param,
    Delete
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ItemsService } from './items.service';
import { AddItemDto } from './dto/add-item-dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @UseGuards(AuthGuard)
    @Post()
    addItem(@Request() req, @Body() addItemDto: AddItemDto) {
        const userId = req.user.sub;
        return this.itemsService.addItem(userId, addItemDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    checkItem(@Request() req) {
        const userId = req.user.sub;
        return this.itemsService.checkItem(userId);
    }

    @UseGuards(AuthGuard)
    @Delete(':name')
    deleteItem(@Request() req, @Param('name') name: string) {
        const userId = req.user.sub;
        return this.itemsService.deleteItem(userId, name);
    }
}
