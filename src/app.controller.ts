import { Controller, Get, Redirect, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('register')
  @Render('register')
  register() {
    return {};
  }

  @Get('login')
  @Render('login')
  login() {
    return {};
  }

  @Get('dashboard')
  @Render('dashboard')
  dashboard() {
    return {};
  }

  @Get('item-add')
  @Render('item-add')
  itemAdd() {
    return {};
  }

  @Get('item-check')
  @Render('item-check')
  itemCheck() {
    return {};
  }

  @Get('item-change')
  @Render('item-change')
  itemChange() {
    return {};
  }

  @Get()
  @Redirect('login')
  root() {
    return;
  }

  @Get('setting')
  @Render('setting')
  setting() {
    return {};
  }

  @Get('category-add')
  @Render('category-add')
  categoryAdd() {
    return {};
  }

  @Get('category-check')
  @Render('category-check')
  categoryCheck() {
    return {};
  }
}
