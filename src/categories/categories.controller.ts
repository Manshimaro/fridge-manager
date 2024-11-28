import { Body, Controller, Get, Post, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddCategoryDto } from './dto/add-category-dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() req) {
        const userId = req.user.sub;
        return this.categoriesService.findAll(userId);
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Request() req, @Body() addCategoryDto: AddCategoryDto) {
        const userId = req.user.sub;
        return this.categoriesService.create(userId, addCategoryDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':name')
    delete(@Request() req, @Param('name') name: string) {
        const userId = req.user.sub;
        return this.categoriesService.delete(userId, name);
    }
}
