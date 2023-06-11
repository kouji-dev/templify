import {Column, Entity, ManyToOne,} from "typeorm";
import {BaseEntity} from "./base-entity";
import {Template} from "./template";
import {AutoMap} from "@automapper/classes";

@Entity({
    name: 'TemplateVariable'
})
export class TemplateVariable extends BaseEntity {

    @Column({nullable: false, type: 'varchar'})
    @AutoMap()
    label!: string;

    @Column({
        nullable: false,
        type: 'varchar'
    })
    @AutoMap()
    target!: string;

    @ManyToOne('Template', 'variables')
    @AutoMap()
    template!: Template;
}
