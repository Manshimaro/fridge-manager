import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
