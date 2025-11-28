import { IsMongoId } from "class-validator";

export class ParamIdSchedulerDto {
    @IsMongoId()
    id: string
}