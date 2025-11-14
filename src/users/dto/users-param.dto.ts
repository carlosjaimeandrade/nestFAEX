import { IsEmail, IsString, IsNotEmpty, IsMongoId } from "class-validator"

export class UsersParamDto {
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    id: string
}