import path from "path";
import {DataSource} from "typeorm";
import {Template, TemplateVariable} from "./entities";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";

const getDatasource: () => DataSourceOptions = () => {
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) {
        return ({
            type: "sqlite",
            database: path.join("./datasource", "genBot.db"),
            synchronize: true,
            logging: true,
            logger: "advanced-console",
            entities: [Template, TemplateVariable]
        })
    }

    return ({
        type: "postgres",
        host: process.env.DATABASE_HOST!,
        port: Number(process.env.DATABASE_PORT!),
        username: process.env.DATABASE_USERNAME!,
        password: process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_DB!,
        synchronize: true,
        logging: true,
        logger: "advanced-console",
        entities: [Template, TemplateVariable]
    })
}

export class DatabaseOperations {
    constructor() {
        throw new Error("Util class have no construct")
    }

    public static async getConnection(): Promise<DataSource> {
        const datasourceOptions = getDatasource();
        const dataSource: DataSource = new DataSource(datasourceOptions);

        if (!dataSource.isInitialized) {
            return dataSource.initialize()
                .then(() => {
                    console.log(`Database initialized`)
                    return dataSource;
                })
                .catch((e) => {
                    console.log(`Couldn't load the database`)
                    console.log(e)
                    return dataSource;
                })
                .finally(() => dataSource);
        }
        return Promise.resolve(dataSource);
    }

    public static getRepository<T extends Object>(dataSource: DataSource, entity: any) {
        return dataSource.getRepository<T>(entity);
    }

}