import { HttpStatus } from '@nestjs/common';
import { FormattedException } from './formatted-exeption';

export class RequestErrorBuilder {
    static throwFormattedGetError(domain: string, instance: string, notFoundMessage?: string) {
        return new FormattedException(
            `${domain} not found`,
            HttpStatus.NOT_FOUND,
            notFoundMessage || `No ${domain.toLowerCase()}s found.`,
            instance,
        );
    }

    static throwFormattedPostError(domain: string) {
        return new FormattedException(
            'Record not created',
            HttpStatus.BAD_REQUEST,
            `Error creating ${domain.toLowerCase()}.`,
            `/${domain.toLowerCase()}s`,
        );
    }

    static throwFormattedPatchError(domain: string, instance: string, id: string) {
        return new FormattedException(
            'Record not found',
            HttpStatus.NOT_FOUND,
            `${domain} with ID ${id} not found.`,
            instance,
        );
    }

    static throwFormattedPatchBodyError(domain: string, instance: string, badRequestMessage?: string) {
        return new FormattedException(
            'Invalid request body',
            HttpStatus.BAD_REQUEST,
            badRequestMessage || `Error updating ${domain.toLowerCase()}.`,
            instance,
        );
    }

    static throwFormattedDeleteError(domain: string, instance: string, id: string) {
        return new FormattedException(
            'Record not found',
            HttpStatus.NOT_FOUND,
            `${domain} with ID ${id} not found.`,
            instance,
        );
    }
}
