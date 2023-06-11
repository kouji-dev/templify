import {DataSource} from "typeorm";
import {NextApiRequest, NextApiResponse} from "next";
import {TemplateVariableService} from "../services";
import {PageSizeResponse} from "../utils";
import {TemplateVariableDto} from "./dtos";

export class TemplateVariableController {
    templateVariableService: TemplateVariableService;
    constructor(datasource: DataSource) {
        this.templateVariableService = new TemplateVariableService(datasource);
    }

    async findAll(req: NextApiRequest, res: NextApiResponse<PageSizeResponse<TemplateVariableDto>>) {
        res.json(await this.templateVariableService.findAll((req.query as any)?.templateId))
    }

    async findOne(req: NextApiRequest, res: NextApiResponse<TemplateVariableDto>) {
        res.json(await this.templateVariableService.findOne((req.query as any)?.id))
    }

    async delete(req: NextApiRequest, res: NextApiResponse<void>) {
        await this.templateVariableService.delete((req.query as any)?.id)
        res.end();
    }

    async save(req: NextApiRequest, res: NextApiResponse<TemplateVariableDto>) {
        res.json(await this.templateVariableService.save(req.body))
    }

}