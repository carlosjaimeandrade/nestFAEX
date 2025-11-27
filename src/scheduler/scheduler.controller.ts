import { Controller, Post, Get, Patch, Body } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { CreateSchedulerConfigDto } from './dto/create-scheduler-config.dto';


@Controller('scheduler')
export class SchedulerController {

    constructor(
        private schedulerService: SchedulerService
    )
    {}

    @Post('/config')
    async createConfig(@Body() body: CreateSchedulerConfigDto) {
        const config = await this.schedulerService.createConfig(body)

        return {
            message: "criado com sucesso",
            config
        }
    }

    @Get('/config')
    async getConfig() {
        return {
            message: "dados buscado com sucesso"
        }
    }

    @Patch('/config')
    async updateConfig() {
        return {
            message: "dados atualizado com sucesso"
        }
    }
}
