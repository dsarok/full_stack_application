import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './app.entity';
import { Messages } from './message.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,
        JwtModule.register({
          global: true,
          secret: process.env.SECRET,
          signOptions: { expiresIn: 5*60*1000 },
        }),],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        database: configService.get('DB_NAME'),
        entities: [Users,Messages],
        synchronize: true,
        username:configService.get('DB_USERNAME'),
        password:''
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Users,Messages])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
