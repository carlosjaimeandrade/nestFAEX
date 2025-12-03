import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { UsersRepository } from './repository/users.respository';
import { BcryptHelper } from './helpers/bcrypt.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, BcryptHelper],
  exports: [UsersRepository, BcryptHelper]
})
export class UsersModule {}
