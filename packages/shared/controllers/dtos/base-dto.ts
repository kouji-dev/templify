import {AutoMap} from "@automapper/classes";

export abstract class BaseDto {
    @AutoMap()
    id!: string;
    @AutoMap()
    createdOn!: string;
    @AutoMap()
    updatedOn!: string;
    @AutoMap()
    deletedOn!: string;
}