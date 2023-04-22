import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './app.entity';
interface message {
  subject: string;
  message: string;
  date: Date;
  id: string;
}
interface users{
  username:string,
  password:string,
  id:string
}
@Injectable()
export class AppService {

  @InjectRepository(Users)
  private readonly repository: Repository<Users>

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

  sendMessage(): boolean {
    const date = new Date();
    console.log('getting some messages');
    // this.messages.push({
    //   subject: 'subject is this',
    //   message: 'hello world is this message is received',
    //   date,
    //   id: this.messages.length.toString(),
    // });
    // console.log(this.messages);
    return true;
  }

  emailFromId(id: string): message{
    // return this.messages.find(e=>e.id===id);
    return 
  };
}
