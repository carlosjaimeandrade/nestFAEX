import { Controller, Post, Get, Param, Query, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){ 

    }

    @Post()
    create(@Body() body: CreateUserDto): Object {
        this.usersService.create()
        
        return {
            body,
            message: "Usuário criado com sucesso!"
        }
    }

    @Get('/:id')
    get(@Param('id') id: string) {
        return {
            id,
            message: "Usuário recuperado com sucesso!"
        }
    }  
    
    @Get()
    getAll() {
        return {
            message: "Todos usuários recuperados com sucesso!"
        }
    }
}
