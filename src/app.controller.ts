import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppService } from './app.service';
import { Messages } from './message.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Get('/greetings')
  helloworld() {
    console.log('we are getting this');
    return { sol: 'Hello world' };
  }

  @Post('/login')
  async authentication(
    @Body() body: { username: string; password: string },
  ): Promise<any> {
    if (body.username && body.password) {
      console.log(body);
      return await this.appService.authenticate(body);
    } else {
      return false;
    }
  }

  @Get('/authorise/:jwt')
  async authorise(@Req() req:Request) {
   return req.body.jwt
  }

  @Post('/register')
  register(
    @Body() body: { username: string; password: string },
  ): Promise<boolean> {
    return this.appService.register(body);
  }

  @Get('/pushemail/:jwt')
  sendEmail(): Promise<boolean> {
    return this.appService.sendMessage();
  }

  @Get('/getemails/:jwt')
  getEmail(): Promise<Messages[]> {
    console.log('values of email')
    return this.appService.fetchEmails();
  }

  @Get('/:id/:user/:jwt')
  userOpenendEmail(@Param('id') id: string, @Param('user') user: string): any {
    return this.appService.readMessages(id, user);
  }

  @Get('/:username/:jwt')
  getMessageList(@Param('username') user: string) {
    return this.appService.readEmails(user);
  }
}
