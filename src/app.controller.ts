import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Messages } from './message.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/greetings')
  helloworld(){
    console.log('we are getting this')
    return {sol:"Hello world"}
  }

  @Post('/login')
  authentication(@Body() body:{username:string,password:string}):Promise<boolean> {
    console.log(body)
    return this.appService.authenticate(body)
  }

  @Post('/register')
  register(@Body() body:{username:string,password:string}):Promise<boolean> {
    return this.appService.register(body)
  }

  @Get('/pushemail')
  sendEmail(): Promise<boolean>{
    return this.appService.sendMessage()
  }

  @Get('/getemails')
  getEmail():Promise<Messages[]>{
    return this.appService.fetchEmails()
  }

  @Get('/:id/:user/')
  userOpenendEmail(@Param('id') id:string,@Param('user') user:string):any{
    return this.appService.readMessages(id,user);
  }

  @Get('/:username')
  getMessageList(@Param('username') user:string){
    return this.appService.readEmails(user)
  }
}
