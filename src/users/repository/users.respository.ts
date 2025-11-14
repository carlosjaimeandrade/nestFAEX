import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../schema/users.schema";
import { Model } from "mongoose";
import { UsersParamDto } from "../dto/users-param.dto";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(Users.name)
        private userModel: Model<Users>
    )
    {}

    create(data: Users): Promise<Users | null> {
        const createUser = new this.userModel(data)

        return createUser.save()
    }

    async findAll(): Promise<Users[]> {
        return this.userModel.find()
    }

    async findById(id: string): Promise<Users | null> {
        return this.userModel.findById(id)
    }

    async findOne(filter: object = {}): Promise<Users | null> {
        return this.userModel.findOne(filter)
    }

    async update(id: string, data: Partial<Users>) {
        return this.userModel.findByIdAndUpdate(id, data, {
            new: true
        })
    }

    async delete(id: string): Promise<Users | null> {
        return this.userModel.findByIdAndDelete(id)
    }
}