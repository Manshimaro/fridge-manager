import { Controller, Post, Body, UseGuards, Get, Param, Request, ForbiddenException, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChangeUserSettingDto } from './dto/change-user-setting-dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getUser(@Request() req, @Param('id') id: string) {
        if(req.user.sub !== id) {
            throw new ForbiddenException();
        }
        return this.usersService.findUserById(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id/setting')
    changeUserSetting(@Request() req, @Param('id') id: string, @Body() changeUserSettingDto: ChangeUserSettingDto) {
        if(req.user.sub !== id) {
            throw new ForbiddenException();
        }
        return this.usersService.changeUserSetting(id, changeUserSettingDto);
    }
}
