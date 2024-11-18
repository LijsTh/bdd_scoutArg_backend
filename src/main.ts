import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function validationExceptionFactory(errors: ValidationError[]) {
  const formattedErrors = errors.reduce(
    (acc: { [key: string]: string[] }, err) => {
      const field = err.property;
      const constraints = err.constraints || { unknown: 'Unknown error' };

      acc[field] = Object.values(constraints);

      return acc;
    },
    {} as { [key: string]: string[] },
  );

  throw new BadRequestException({
    message: 'Validation failed',
    errors: formattedErrors, // Attach the formatted errors to the response
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Automatically remove non-whitelisted properties
      forbidNonWhitelisted: true, // Throw an error when non-whitelisted properties are present
      exceptionFactory: (errors) => validationExceptionFactory(errors),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
