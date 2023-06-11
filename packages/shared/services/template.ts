import {DEFAULT_TEMPLATE_CONTENT} from "./constants";
import {DataSource, Repository} from "typeorm";
import {Buffer} from "buffer";
import {mapEntity, mapEntityList} from "../mappings";
import {DatabaseOperations, Template} from "../database";
import {Id, PageSizeRequest, PageSizeResponse} from "../utils";
import {GenerateTemplateDto, TemplateDto} from "../controllers";

export class TemplateService {
    private repository: Repository<Template>;

    constructor(dataSource: DataSource) {
        this.repository = DatabaseOperations.getRepository<Template>(dataSource, Template);
    }

    public async findOne(id: Id): Promise<TemplateDto> {
        return this.repository
            .findOne({where: {id}})
            .then((entity) => mapEntity(entity, Template, TemplateDto))
    }

    public async findAll({page, size}: PageSizeRequest): Promise<PageSizeResponse<TemplateDto>> {
        return this.repository
            .findAndCount({
                take: size,
                skip: ((page - 1) * size),
                relations: {
                    variables: true
                }
            })
            .then(([entities, total]) => ({
                data: mapEntityList(entities, Template, TemplateDto),
                total
            }))
    }

    public async create(): Promise<TemplateDto> {
        return this.repository
            .save(this.repository.create({
                content: DEFAULT_TEMPLATE_CONTENT
            }))
            .then((entity) => mapEntity(entity, Template, TemplateDto))
    }

    public async save(dto: TemplateDto): Promise<TemplateDto> {
        return this.repository
            .save(dto)
            .then((entity) => mapEntity(entity, Template, TemplateDto))
    }

    public async updateTitle({id, title}: TemplateDto): Promise<TemplateDto> {
        const template = await this.repository.findOneOrFail({
            where: {id}
        });
        template.title = title;
        return this.repository
            .save(template)
            .then((entity) => mapEntity(entity, Template, TemplateDto))
    }

    public async delete(id: Id): Promise<void> {
        return this.repository
            .softRemove({id: id})
            .then(() => Promise.resolve())
    }

    public async generate({id, variables}: GenerateTemplateDto): Promise<Buffer> {
        // const template = await this.repository.findOneOrFail({
        //     where: {id}
        // });
        // const renderedHTML: string = render(template.content, variables)
        // try {
        //     return await generatePDF(renderedHTML);
        // } catch (e) {
        //     console.log("Couldn't generate file")
        //     console.error(e);
        // }
        return Promise.resolve(Buffer.from("empty"))
    }
}