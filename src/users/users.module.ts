import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { appEntities } from 'src/schema';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature(appEntities)
  ],
  providers: [UsersService],
  exports:[UsersService],
  controllers: [UserController],
})
export class UsersModule {}
