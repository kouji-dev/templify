import {DataSource} from "typeorm";
import {NextApiRequest, NextApiResponse} from "next";
import {TemplateService} from "../services";
import {getTemplateFileName, PageSizeRequest, PageSizeResponse} from "../utils";
import {GenerateTemplateDto, TemplateDto} from "./dtos";

export class TemplateController {
    templateService: TemplateService;
    constructor(datasource: DataSource) {
        this.templateService = new TemplateService(datasource);
    }

    async findAll(req: NextApiRequest, res: NextApiResponse<PageSizeResponse<TemplateDto>>) {
        res.json(await this.templateService.findAll(req.query as unknown as PageSizeRequest))
    }

    async findOne(req: NextApiRequest, res: NextApiResponse<TemplateDto>) {
        res.json(await this.templateService.findOne((req.query as any)?.id))
    }

    async delete(req: NextApiRequest, res: NextApiResponse<void>) {
        await this.templateService.delete((req.query as any)?.id)
        res.end();
    }

    async create(req: NextApiRequest, res: NextApiResponse<TemplateDto>) {
        res.json(await this.templateService.create())
    }

    async save(req: NextApiRequest, res: NextApiResponse<TemplateDto>) {
        res.json(await this.templateService.save(req.body))
    }

    async generate(req: NextApiRequest, res: NextApiResponse<any>) {
        const body = req.body as GenerateTemplateDto;
        const template = await this.templateService.findOne(body.id);
        console.log({template})
        const buffer = await this.templateService.generate(body);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-disposition', `attachment; filename=${getTemplateFileName(template.title)}.pdf`);
        res.send(buffer);
    }
}