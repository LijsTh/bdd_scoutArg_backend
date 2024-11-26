import { HttpException, HttpStatus } from '@nestjs/common';

export class FormattedException extends HttpException {
    constructor(title: string, status: HttpStatus, detail: string, instance: string) {
        super(
            {
                title,
                status,
                detail,
                instance,
            },
            status,
        );
    }
}

export class ValidationErr {
    field: string;
    reason: string;
    constructor(field: string, reason: string) {
        this.field = field;
        this.reason = reason;
    }
}

export class FormattedExceptionWithValidation extends HttpException {
    constructor(
        title: string,
        status: HttpStatus,
        detail: string,
        instance: string,
        validationsErrors: ValidationErr[],
    ) {
        super(
            {
                title,
                status,
                detail,
                instance,
                validationsErrors,
            },
            status,
        );
    }
}
