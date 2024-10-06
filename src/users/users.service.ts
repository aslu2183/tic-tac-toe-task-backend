import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schema/user.schema';


@Injectable()
export class UsersService {
    constructor(@InjectModel("Users") private userModel: Model<User>) {}

    async findOne(filter) {
        return await this.userModel.findOne(filter);
    }

    async createData(data) {
        return await new this.userModel(data).save()
    }

    async findById(id:Types.ObjectId){
        return await this.userModel.findById(id,'-password')
    }
}
