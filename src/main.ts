import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Data Cakra Backend Test API')
    .setVersion('1.0')
    .addTag('APIs')
    .addBearerAuth({
      type: 'apiKey',
      scheme: 'Bearer',
      name: 'Authorization',
      description:
        'Please enter token in following format: <b>Bearer [JWT]</b>',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
