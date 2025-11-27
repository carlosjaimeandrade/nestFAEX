import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/faex'),
    UsersModule,
    SchedulerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
