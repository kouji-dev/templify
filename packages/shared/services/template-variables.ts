import {DataSource, Repository} from "typeorm";
import {mapEntity, mapEntityList} from "../mappings";
import {DatabaseOperations, Template, TemplateVariable} from "../database";
import {TemplateVariableDto} from "../controllers";
import {Id, PageSizeResponse} from "../utils";

export class TemplateVariableService {
    private repository: Repository<TemplateVariable>;
    private parentRepository: Repository<Template>;

    constructor(datasource: DataSource) {
        this.repository = DatabaseOperations.getRepository<TemplateVariable>(datasource, TemplateVariable);
        this.parentRepository = DatabaseOperations.getRepository<Template>(datasource, Template);

    }

    public async findOne(id: Id): Promise<TemplateVariableDto> {
        return this.repository
            .findOne({where: {id}})
            .then((entity) => mapEntity(entity, TemplateVariable, TemplateVariableDto))
    }

    private async findAllByTemplate(templateId: string): Promise<TemplateVariable[]> {
        return this.repository
            .find({
                where: {
                    template: {id: templateId}
                }
            })
    }

    public async findAll(templateId: Id): Promise<PageSizeResponse<TemplateVariableDto>> {
        return this.findAllByTemplate(templateId)
            .then((entities) => ({
                data: mapEntityList(entities, TemplateVariable, TemplateVariableDto),
                total: entities.length
            }))
    }

    public async save(data: TemplateVariableDto): Promise<TemplateVariableDto> {
        const templateVariable: TemplateVariable = mapEntity(data, TemplateVariableDto, TemplateVariable);
        templateVariable.template = await this.parentRepository.findOneOrFail({
            where: {
                id: data.template?.id
            }
        });
        return this.repository
            .save(templateVariable)
            .then((entity) => mapEntity(entity, TemplateVariable, TemplateVariableDto))
    }

    public async delete(id: Id): Promise<void> {
        return this.repository
            .softRemove({id})
            .then(() => Promise.resolve())
    }
}