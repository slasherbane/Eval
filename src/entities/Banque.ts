import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Banque {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    RIB: number;
    @Column()
    PASS: number;

}
