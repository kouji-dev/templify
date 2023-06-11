import {AutoMap} from "@automapper/classes";

export class GenerateTemplateDto {
    @AutoMap()
    id!: string;
    @AutoMap()
    variables!: Record<string, string>;
}