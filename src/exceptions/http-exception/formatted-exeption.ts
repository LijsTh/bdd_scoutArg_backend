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
