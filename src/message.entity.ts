import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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