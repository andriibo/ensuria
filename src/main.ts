import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error'],
  });

  const config = new DocumentBuilder()
      .setTitle('Ensuria API')
      .setDescription('Ensuria API description')
      .addServer(process.env.APP_URL)
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Ensuria API',
  });

  app.enableCors();
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
  );

  await app.listen(3000);

  process.on('unhandledRejection', (error) => {
    console.log(error);
  });
}
bootstrap();
