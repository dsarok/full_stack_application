import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id:string

    @Column({nullable:false})
    username:string

    @Column({nullable:false})
    password:string
}