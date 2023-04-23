import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './app.entity';
import { Messages } from './message.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  @InjectRepository(Users)
  private readonly repository: Repository<Users>;

  @InjectRepository(Messages)
  private readonly messageRepository: Repository<Messages>;
  constructor(private jwtService: JwtService) {}

  async authenticate(body: {
    username: string;
    password: string;
  }): Promise<any> {
    console.log('body getting ', body);
    const res = await this.repository.findOne({
      where: { username: body.username, password: body.password },
    });
    if (res) {
      let sign = await this.jwtService.signAsync({
        username: res.username,
      });

      return { jwt: sign };
    } else return false;
  }

  async register(body: {
    username: string;
    password: string;
  }): Promise<boolean> {
    if (body.username.length > 4 && body.password.length > 4) {
      const res = await this.repository.findOne({
        where: { username: body.username },
      });
      console.log(res, 'this is the solution');
      if (!res) {
        let user = new Users();
        user.username = body.username;
        user.password = body.password;
        this.repository.save(user);
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  async sendMessage(): Promise<boolean> {
    const date = new Date();
    console.log('getting some messages');
    let message = new Messages();
    message.body = 'Greetings Please Submit Your Report Today';
    message.date = date;
    message.subject = 'performance of every one';
    const res = await this.messageRepository
      .save(message)
      .then((res) => res.id)
      .catch((res) => console.log('failed due to ' + res));
    return res ? true : false;
  }

  fetchEmails(): Promise<Messages[]> {
    console.log('values of email being extracted');
    return this.messageRepository.find();
  }

  emailFromId(id: string): Promise<Messages> {
    return this.messageRepository.findOne({ where: { id: id } });
  }

  async readMessages(id: string, user: string): Promise<any> {
    let ourUser = await this.repository
      .findOne({
        where: { username: user },
        relations: {
          messages: true,
        },
      })
      .then((res) => {
        console.log(res.messages);
        return res;
      });

    let message = await this.messageRepository
      .findOne({ where: { id: id } })
      .then((res) => res);
    console.log(ourUser, message, 'this is check', ourUser.messages);
    ourUser['messages'] = ourUser.messages
      ? [...ourUser.messages, message]
      : [message];
    this.repository.save(ourUser);
    return message;
  }

  async readEmails(user: string): Promise<Messages[]> {
    const res = await this.repository.findOne({
      where: { username: user },
      relations: {
        messages: true,
      },
    });
    return res.messages;
  }

  async authorize(jwt: string) {
    if (jwt) {
      let verify = await this.jwtService.verifyAsync(jwt);
      console.log(verify, ' this is the verification ');
      if (verify) {
        let decode = this.jwtService.decode(jwt);
        console.log(decode, ' decoded ');
        return decode;
      } else return false;
    }
    return false;
  }
}
