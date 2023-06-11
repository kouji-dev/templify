import {CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {AutoMap} from "@automapper/classes";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @AutoMap()
    id!: string;

    @CreateDateColumn({type: "date"})
    @AutoMap()
    createdOn!: string;

    @UpdateDateColumn({type: "date"})
    @AutoMap()
    updatedOn!: string;

    @DeleteDateColumn({type: "date"})
    @AutoMap()
    deletedOn!: string;
}