import { IsEmail, IsString, IsArray, IsIn, IsBoolean, IsOptional, ValidateNested } from "class-validator"
import { Type } from "class-transformer";

export class SchedulerFieldDto {
  @IsString()
  type: string;

  @IsBoolean()
  required: boolean;

  @IsString()
  label: string;

  @IsString()
  placeholder: string;

  @IsOptional()
  @IsArray()
  options?: any[];
}

export class UpdateSchedulerConfigDto {
    @IsString()
    name: string
    
    @IsString()
    description: string
    
    @IsString()
    color: string

    @IsArray()
    @Type(() => SchedulerFieldDto) //transforma o JSON bruto que vem no request em objetos no formato que o NestJS (e o class-validator) entendem corretamente.
    @ValidateNested({ each: true }) //diz que cada item do array deve ser validado baseado na configuração personalizada do dto
    fields: SchedulerFieldDto[]

    @IsArray()
    @IsIn(["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"], { each: true })
    weekdays: string[]

    @IsBoolean()
    status: boolean
}