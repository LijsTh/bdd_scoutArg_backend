import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpAdapterHost } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationErr, FormattedExceptionWithValidation } from './utils/exceptions/http-exception/formatted-exeption';
import { ExceptionFilter } from './utils/exceptions/http-exception/error-filter-handler';

export function validationExceptionFactory(errors: ValidationError[]) {
    const parsedErrors: ValidationErr[] = [];

    for (const error of errors) {
        const property: string = error.property;
        const constraints = error.constraints;
        if (constraints) {
            parsedErrors.push(new ValidationErr(property, Object.values(constraints)[0]));
        }
    }

    throw new FormattedExceptionWithValidation(
        'Validation Error',
        400,
        'Validation failed for the request',
        'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        parsedErrors,
    );
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
        origin: '*',
        methods: 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        allowedHeaders: 'Content-Type, Authorization',
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true, // Automatically transform payloads to DTO instances
            whitelist: true, // Automatically remove non-whitelisted properties
            forbidNonWhitelisted: true, // Throw an error when non-whitelisted properties are present
            exceptionFactory: (errors) => validationExceptionFactory(errors),
        }),
    );
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const config = new DocumentBuilder()
        .setTitle('Median')
        .setDescription('The Median API description')
        .setVersion('0.1')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionFilter(httpAdapter));

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
