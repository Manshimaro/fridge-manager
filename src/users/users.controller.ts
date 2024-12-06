import { Controller, Post, Body, UseGuards, Get, Param, Request, ForbiddenException, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChangeUserSettingDto } from './dto/change-user-setting-dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: '유저 추가' })
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiOperation({ summary: '유저 취득' })
    getUser(@Request() req, @Param('id') id: string) {
        if(req.user.sub !== id) {
            throw new ForbiddenException();
        }
        return this.usersService.findUserById(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id/setting')
    @ApiOperation({ summary: '유저 설정 변경' })
    changeUserSetting(@Request() req, @Param('id') id: string, @Body() changeUserSettingDto: ChangeUserSettingDto) {
        if(req.user.sub !== id) {
            throw new ForbiddenException();
        }
        return this.usersService.changeUserSetting(id, changeUserSettingDto);
    }
}
