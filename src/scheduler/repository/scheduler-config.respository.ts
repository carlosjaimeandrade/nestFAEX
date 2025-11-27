import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SchedulerConfig } from "../schema/scheduler-config.schema";

@Injectable()
export class SchedulerConfigRepository {
    constructor(
        @InjectModel(SchedulerConfig.name)
        private schedulerConfig: Model<SchedulerConfig>
    )
    {}

    create(data: Partial<SchedulerConfig>): Promise<SchedulerConfig | null> {
        const createUser = new this.schedulerConfig(data)

        return createUser.save()
    }

    async findAll(): Promise<SchedulerConfig[]> {
        return this.schedulerConfig.find()
    }

    async findById(id: string): Promise<SchedulerConfig | null> {
        return this.schedulerConfig.findById(id)
    }

    async findOne(filter: object = {}): Promise<SchedulerConfig | null> {
        return this.schedulerConfig.findOne(filter)
    }

    async update(id: string, data: Partial<SchedulerConfig>) {
        return this.schedulerConfig.findByIdAndUpdate(id, data, {
            new: true
        })
    }

    async delete(id: string): Promise<SchedulerConfig | null> {
        return this.schedulerConfig.findByIdAndDelete(id)
    }
}