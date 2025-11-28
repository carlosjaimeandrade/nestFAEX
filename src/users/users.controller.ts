import { Controller, Post, Get, Param, Query, Body, Delete, Patch, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UsersParamDto } from './dto/users-param.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){ 
    }

    @Post()
    async create(@Body() body: CreateUserDto): Promise<Object> {
        
        const users = await this.usersService.create(body)

        return {
            message: "cadastrado com sucesso",
            user: {
                email: users.email,
                name: users.name
            }
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll() {
        const users = await this.usersService.getAll()

        return {
            message: "Consulta realizada!",
            total: users.length,
            users,

        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async get(@Param() param: UsersParamDto) {
        const user = await this.usersService.getById(param.id)

        return {
            message: "Consulta realizad com sucesso",
            user
        }
    }  

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async delete(@Param() param: UsersParamDto)
    {
        const user = await this.usersService.delete(param.id)
        return {
            message: "usuário deletado com sucesso",
            user
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id')
    async update(
        @Param() param: UsersParamDto,
        @Body() body: Partial<CreateUserDto>
    ) {
        const user = await this.usersService.update(param.id, body)
        return {
            message: "usuário atualizado com sucesso",
            user
        }
    }
}
