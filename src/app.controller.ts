import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Users } from './app.entity';
import { AppService } from './app.service';

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
  sendEmail():boolean{
    this.appService.sendMessage()
    return true
  }

  @Get('/getemails')
  getEmail():any[]{
    return ["this.appService.messages"]
  }

  @Get('/:id')
  getEmailFromId(@Param('id') id:string):any{
    console.log(id,this.appService.emailFromId(id))
    return this.appService.emailFromId(id)
  }

}
