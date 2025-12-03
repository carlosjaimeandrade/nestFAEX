import { IsString, IsOptional, IsBoolean } from "class-validator"
import { Transform } from "class-transformer";

export class QuerySchedulerConfigDto {
    @IsOptional()
    @IsBoolean()
    @Transform(( { value }) => value === 'true' )
    status?: boolean;
}