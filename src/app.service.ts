import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './app.entity';
import { Messages } from './message.entity';
@Injectable()
export class AppService {

  @InjectRepository(Users)
  private readonly repository: Repository<Users>

  @InjectRepository(Messages)
  private readonly messageRepository: Repository<Messages>

  authenticate(body: { username: string; password: string }): Promise<boolean> {
    return (
      this.repository.findOne({where:{username:body.username,password:body.password}})
      .then(res=>{
        if(res){
          return true;
        }
        else
        return false;
      })
    );
  }

  async register(body: { username: string; password: string }): Promise<boolean> {
   
    if (body.username.length > 4 && body.password.length > 4) 
    { 
      const res = await this.repository.findOne({ where: { username: body.username } });
      console.log(res,'this is the solution')
      if (!res) {
        let user= new Users()
        user.username=body.username;
        user.password=body.password
        this.repository.save(user);
        return true;
      }
      else {
        return false;
      }
    }
      
    return false
  }

  sendMessage(): Promise<boolean> {
    const date = new Date();
    console.log('getting some messages');
    let message=new Messages()
    message.body='Greetings Please Submit Your Report Today'
    message.date=date
    message.subject='performance of every one'
    return this.messageRepository.save(message).then(res=> res?true:false)
  }

  fetchEmails():Promise<Messages[]>{
    return this.messageRepository.find()
  }

  emailFromId(id: string): Promise<Messages>{
    return this.messageRepository.findOne({where:{id:id}});
  };

  async readMessages(id:string,user:string):Promise<any>{
    let ourUser = await this.repository.findOne({where:{username:user},relations:{
      messages:true
    }}).then(res=>{
      console.log(res.messages)
      return res})
    
    let message = await this.messageRepository.findOne({where:{id:id}}).then(res=>res)
    console.log(ourUser,message,'this is check',ourUser.messages)
    ourUser.messages=ourUser.messages?[...ourUser.messages,message]:[message]
    this.repository.save(ourUser) 
    return message
  }

  async readEmails(user:string):Promise<Messages[]>{
   const res = await this.repository.findOne({ where: { username: user } });
    return res.messages;
  }
}
