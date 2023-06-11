import {BaseDto} from "./base-dto";
import {AutoMap} from "@automapper/classes";
import {TemplateDto} from "./template-dto";

export class TemplateVariableDto extends BaseDto {
    @AutoMap()
    label!: string;
    @AutoMap()
    target!: string;
    @AutoMap(() => TemplateDto)
    template!: TemplateDto;
}