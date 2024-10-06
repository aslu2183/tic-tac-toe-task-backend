import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const port = process.env.PORT||3000
  const HOST = '0.0.0.0'
  await app.listen(port,HOST);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
