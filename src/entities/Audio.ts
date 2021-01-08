import {Entity, Column, PrimaryGeneratedColumn, Timestamp} from "typeorm";
import { DateUtil } from '../utils/DateUtil';
@Entity()

export class Audio {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    cover?: string;

    @Column()
    name?: string;

    @Column()
    url?: string;
    @Column()
    time?: string;
    @Column({ type: "datetime", nullable: false })
    createdAt: Date;
    @Column({ type: "datetime", nullable: true })
    updatedAt?: null | Date;
    @Column()
    type?: number;






    constructor(createdAt: null | Date) {
        if (createdAt === null) {
            this.createdAt = new Date()
        } else {
            this.createdAt = createdAt;
        }


    }



}