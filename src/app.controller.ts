import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('register')
  @Render('register')
  @ApiOperation({ summary: '회원 가입 페이지 취득' })
  register() {
    return {};
  }

  @Get('login')
  @Render('login')
  @ApiOperation({ summary: '로그인 페이지 취득' })
  login() {
    return {};
  }

  @Get('dashboard')
  @Render('dashboard')
  @ApiOperation({ summary: '대시보드 페이지 취득' })
  dashboard() {
    return {};
  }

  @Get('item-add')
  @Render('item-add')
  @ApiOperation({ summary: '아이템 추가 페이지 취득' })
  itemAdd() {
    return {};
  }

  @Get('item-check')
  @Render('item-check')
  @ApiOperation({ summary: '아이템 확인 페이지 취득' })
  itemCheck() {
    return {};
  }

  @Get('item-change')
  @Render('item-change')
  @ApiOperation({ summary: '아이템 변경 페이지 취득' })
  itemChange() {
    return {};
  }

  @Get()
  @Redirect('login')
  @ApiOperation({ summary: '루트 페이지 취득' })
  root() {
    return;
  }

  @Get('setting')
  @Render('setting')
  @ApiOperation({ summary: '설정 페이지 취득' })
  setting() {
    return {};
  }

  @Get('category-add')
  @Render('category-add')
  @ApiOperation({ summary: '카테고리 추가 페이지 취득' })
  categoryAdd() {
    return {};
  }

  @Get('category-check')
  @Render('category-check')
  @ApiOperation({ summary: '카테고리 확인 페이지 취득' })
  categoryCheck() {
    return {};
  }
}
