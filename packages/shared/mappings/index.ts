import {createMap, createMapper} from "@automapper/core";
import {classes} from "@automapper/classes";
import {ModelIdentifier} from "@automapper/core/lib/types";
import {TemplateDto, TemplateVariableDto} from "../controllers";
import {Template, TemplateVariable} from "../database";

const mapper = createMapper({
    strategyInitializer: classes()
});

createMap(
    mapper,
    TemplateDto,
    Template,
);
createMap(
    mapper,
    Template,
    TemplateDto,
);
createMap(
    mapper,
    TemplateVariable,
    TemplateVariableDto
);
createMap(
    mapper,
    TemplateVariableDto,
    TemplateVariable,
);

export const mapEntity: <T>(object: any, from: ModelIdentifier, to: ModelIdentifier) => T = <T>(object: any, from: ModelIdentifier, to: ModelIdentifier<T>) => {
    const result: any = {}
    mapper.mutate(object, result,  from, to)
    return result as T;
}

export const mapEntityList: <T>(objects: any[], from: ModelIdentifier, to: ModelIdentifier) => T[] = <T>(objects: any[], from: ModelIdentifier, to: ModelIdentifier<T>) => {
    return objects.map((obj) => mapEntity(obj, from, to))
}