import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './app.entity';

@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    id:string

    @Column({nullable:false})
    subject:string

    @Column({nullable:false})
    body:string

    @Column()
    date:Date

   
}