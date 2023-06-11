import {Column, Entity, OneToMany,} from "typeorm";
import {BaseEntity} from "./base-entity";
import {TemplateVariable} from "./template-variable";
import {AutoMap} from "@automapper/classes";

@Entity({
    name: 'Template'
})
export class Template extends BaseEntity {

    @Column({type: "text"})
    @AutoMap()
    content!: string;

    @Column({type: "varchar", nullable: true})
    @AutoMap()
    title!: string;

    @OneToMany('TemplateVariable', 'template', {
        cascade: ['remove'],
    })
    variables!: TemplateVariable[];
}
