import { Controller, Post, Get, Patch, Body, Query, Param, UseGuards } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { CreateSchedulerConfigDto } from './dto/create-scheduler-config.dto';
import { QuerySchedulerConfigDto } from './dto/query-scheduler-config.dto';
import { ParamIdSchedulerDto } from './dto/param-id-scheduler-config.dto';
import { UpdateSchedulerConfigDto } from './dto/update-scheduler-config.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('scheduler')
export class SchedulerController {

    constructor(
        private schedulerService: SchedulerService
    )
    {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/config')
    async createConfig(@Body() body: CreateSchedulerConfigDto) {
        const config = await this.schedulerService.createConfig(body)

        return {
            message: "criado com sucesso",
            config
        }
    }

    @Get('/config')
    async getConfig(@Query() query: QuerySchedulerConfigDto) {
        const configs = await this.schedulerService.getConfigs(query.status)

        return {
            total: configs.length,
            configs,
            query
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/config/:id')
    async updateConfig(
        @Param() param: ParamIdSchedulerDto,
        @Body() body: UpdateSchedulerConfigDto
    ) {
        const update = await this.schedulerService.updateConfig(param.id, body)

        return {
            update
        }
    }
}
