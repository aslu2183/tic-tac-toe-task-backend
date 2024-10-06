import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { appEntities } from './schema';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature(appEntities)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
