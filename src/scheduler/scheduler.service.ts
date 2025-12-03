import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SchedulerConfigRepository } from './repository/scheduler-config.respository';
import { SchedulerConfig } from './schema/scheduler-config.schema';

@Injectable()
export class SchedulerService {

    constructor(
        private schedulerConfigRepository: SchedulerConfigRepository
    )
    {}

    async createConfig(body: Partial<SchedulerConfig>): Promise<SchedulerConfig> {
        body.status = false;

        const config = await this.schedulerConfigRepository.create(body)

        if (!config) {
            throw new InternalServerErrorException("Ocorreu um erro interno")
        }

        return config
    }

    async getConfigs(status?: boolean): Promise<SchedulerConfig[]> {
        const filter = {};

        if (status == true) {
            filter['status'] = true
        }

        const config = await this.schedulerConfigRepository.findAll(filter)

        return config
    }

    async updateConfig(id: string, body: Partial<SchedulerConfig>): Promise<SchedulerConfig> {
        if (body.status === true) {
            const allConfigs = await this.schedulerConfigRepository.findAll({
                status: true
            })

            for (const config of allConfigs) { 
                config.status = false
                await this.schedulerConfigRepository.update(config.id, config)
            }
        }

        const registerExists = await this.schedulerConfigRepository.findById(id)

        if (!registerExists) {
            throw new NotFoundException('Id não encontrado')
        }

        const config = await this.schedulerConfigRepository.update(id, body)

        if (!config) {
            throw new InternalServerErrorException("Ocorreu um erro interno")
        }

        return config
    }

}
