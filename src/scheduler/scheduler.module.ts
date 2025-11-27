import { Module } from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { SchedulerConfigSchema } from './schema/scheduler-config.schema';
import { SchedulerConfig } from './schema/scheduler-config.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerConfigRepository } from './repository/scheduler-config.respository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchedulerConfig.name, schema: SchedulerConfigSchema }
    ])
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService, SchedulerConfigRepository]
})
export class SchedulerModule {}
