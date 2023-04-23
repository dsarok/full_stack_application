import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppService } from './app.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const jwt = req.params.jwt as string;
    console.log(req.params,'this is comming from middlewear')
    try {
      if (jwt ){
        console.log(jwt.split('=')[1],'this jwt from middleware')
        let autho = await this.appService.authorize(jwt.split('=')[1])
        req.body['jwt']=autho
        console.log(autho,'this is authorised')
        next();
    }
      else {
        res.send('not authorized to use');
        next()
      }
    } catch (e) {
      res.send('not authorized to use')
      next()
      return false;
    }
  }
}
