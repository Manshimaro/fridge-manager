import { Body, Controller, Get, Post, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddCategoryDto } from './dto/add-category-dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @UseGuards(AuthGuard)
    @Get()
    @ApiOperation({ summary: '카테고리 목록 취득' })
    findAll(@Request() req) {
        const userId = req.user.sub;
        return this.categoriesService.findAll(userId);
    }

    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({ summary: '카테고리 추가' })
    create(@Request() req, @Body() addCategoryDto: AddCategoryDto) {
        const userId = req.user.sub;
        return this.categoriesService.create(userId, addCategoryDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':name')
    @ApiOperation({ summary: '카테고리 삭제' })
    delete(@Request() req, @Param('name') name: string) {
        const userId = req.user.sub;
        return this.categoriesService.delete(userId, name);
    }
}
