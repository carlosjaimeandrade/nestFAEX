import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // retorna erro se enviar campos extras
      transform: true,           // converte payload em instância da classe DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
