import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerModule } from './scheduler/scheduler.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/faex'),
    UsersModule,
    SchedulerModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
