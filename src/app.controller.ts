import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
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
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
   
    if(body.username && body.password)
      {
        let jwt = await this.appService.authenticate(body);
        if (jwt) {
        response.cookie('jwt', jwt, { httpOnly: true });
        return true;
        } else return false;
      }
      else{
        return false;
      }
  }
  
  @Get('/authorise')
  async authorise(@Req() request:Request){
    let verified = request.cookies['jwt'];
    console.log(verified)
    if (verified) {
      let verify = await this.jwtService.verifyAsync(verified)
      console.log(verify)
      if (verify) {
        return this.jwtService.decode(verified)
      }
      else
      return false;
    }
    return false;
  }

  @Post('/register')
  register(
    @Body() body: { username: string; password: string },
  ): Promise<boolean> {
    return this.appService.register(body);
  }

  @Get('/pushemail')
  sendEmail(): Promise<boolean> {
    return this.appService.sendMessage();
  }

  @Get('/getemails')
  getEmail(): Promise<Messages[]> {
    return this.appService.fetchEmails();
  }

  @Get('/:id/:user/')
  userOpenendEmail(@Param('id') id: string, @Param('user') user: string): any {
    return this.appService.readMessages(id, user);
  }

  @Get('/:username')
  getMessageList(@Param('username') user: string) {
    return this.appService.readEmails(user);
  }
}
