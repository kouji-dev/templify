import {BaseDto} from "./base-dto";
import {AutoMap} from "@automapper/classes";

export class TemplateDto extends BaseDto {
    @AutoMap()
    content!: string;
    @AutoMap()
    title!: string;
}