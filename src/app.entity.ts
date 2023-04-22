import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Messages } from './message.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id:string

    @Column({nullable:false})
    username:string

    @Column({nullable:false})
    password:string

    @ManyToMany(()=>Messages,(messages)=>messages.id)
    @JoinTable()
    messages: Messages[]
}