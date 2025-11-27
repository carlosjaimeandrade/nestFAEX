import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

}
