import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { PrismaErrorFormatter } from '../prisma-client-exception/prisma-error-formatter.filter'; // Adjust the path as necessary
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new Logger(ExceptionFilter.name);
    catch(exception: any, host: ArgumentsHost) {
        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            this.handlePrismaException(exception, host);
            return;
        }
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();
        const instance = request.url;

        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(`500 Error - ${request.method} ${request.url}: ${exception.message}`, exception.stack);
            response.status(status).json({
                title: 'Unexpected Server Error',
                status: exception.response.status,
                detail: 'A server error ocurred, please try again or contact administrator',
                instance: instance,
            });
        } else {
            const errorResponse: any = {
                title: exception.response?.title || 'Error',
                status: exception.response?.status || status,
                detail: exception.response?.detail || 'Invalid Request Format',
                instance: instance,
            };

            if (exception.response?.validationsErrors) {
                errorResponse.validationsErrors = exception.response.validationsErrors;
            }

            response.status(status).json(errorResponse);
        }
    }

    private handlePrismaException(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();
        const instance = request.url;

        // Usa PrismaErrorFormatter para procesar el mensaje amigable
        const formatter = new PrismaErrorFormatter(exception);
        const detail = formatter.getFriendlyMessage();
        const title = formatter.getFriendlyTitle();

        // Determina el estado HTTP basado en el código de error
        const status = this.getHttpStatus(exception.code);

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            console.error(exception);
        }

        response.status(status).json({
            title: title,
            status: status,
            detail: detail,
            instance: instance,
        });
    }

    private getHttpStatus(code: string): HttpStatus {
        const statusMap: Record<string, HttpStatus> = {
            P2001: HttpStatus.NOT_FOUND,
            P2002: HttpStatus.CONFLICT,
            P2003: HttpStatus.BAD_REQUEST,
            P2004: HttpStatus.BAD_REQUEST,
            P2005: HttpStatus.BAD_REQUEST,
            P2006: HttpStatus.BAD_REQUEST,
            P2007: HttpStatus.BAD_REQUEST,
            P2008: HttpStatus.BAD_REQUEST,
            P2009: HttpStatus.BAD_REQUEST,
            P2010: HttpStatus.BAD_REQUEST,
            P2011: HttpStatus.BAD_REQUEST,
            P2012: HttpStatus.BAD_REQUEST,
            P2013: HttpStatus.BAD_REQUEST,
            P2014: HttpStatus.BAD_REQUEST,
            P2015: HttpStatus.NOT_FOUND,
            P2016: HttpStatus.BAD_REQUEST,
            P2017: HttpStatus.BAD_REQUEST,
            P2018: HttpStatus.BAD_REQUEST,
            P2019: HttpStatus.BAD_REQUEST,
            P2020: HttpStatus.BAD_REQUEST,
            P2021: HttpStatus.NOT_FOUND,
            P2022: HttpStatus.NOT_FOUND,
            P2023: HttpStatus.BAD_REQUEST,
            P2024: HttpStatus.GATEWAY_TIMEOUT,
            P2025: HttpStatus.NOT_FOUND,
            P2026: HttpStatus.BAD_REQUEST,
            P2027: HttpStatus.BAD_REQUEST,
            P2028: HttpStatus.INTERNAL_SERVER_ERROR,
            P2029: HttpStatus.BAD_REQUEST,
            P2030: HttpStatus.BAD_REQUEST,
            P2031: HttpStatus.BAD_REQUEST,
            P2033: HttpStatus.BAD_REQUEST,
            P2034: HttpStatus.CONFLICT,
            P2035: HttpStatus.BAD_REQUEST,
            P2036: HttpStatus.BAD_REQUEST,
            P2037: HttpStatus.INTERNAL_SERVER_ERROR,
            P2000: HttpStatus.INTERNAL_SERVER_ERROR,
        };

        return statusMap[code] || HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
