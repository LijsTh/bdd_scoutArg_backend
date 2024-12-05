import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { FormattedException } from '../exceptions/http-exception/formatted-exeption';
import { decodeToken, validateToken } from '../auth/auth';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class ValidateAdminMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: Error | any) => void) {
        try {
            const auth = req.headers.authorization;
            if (!auth)
                throw new FormattedException('Unauthorized', HttpStatus.UNAUTHORIZED, 'No token provided', req.url);

            const tokenParts = auth.split(' ');
            if (tokenParts.length !== 2)
                throw new FormattedException('Unauthorized', HttpStatus.UNAUTHORIZED, 'Invalid token', req.url);

            const tokenType = tokenParts[0];
            if (tokenType !== 'Bearer')
                throw new FormattedException('Unauthorized', HttpStatus.UNAUTHORIZED, 'Invalid token type', req.url);

            const token = tokenParts[1];
            if (!token)
                throw new FormattedException('Unauthorized', HttpStatus.UNAUTHORIZED, 'No token provided', req.url);

            let payload = validateToken(token);
            const decodedPayload = decodeToken(token);
            if (!decodedPayload)
                throw new FormattedException('Unauthorized', HttpStatus.UNAUTHORIZED, 'Invalid token', req.url);
            payload = decodedPayload;

            const adminID = process.env.ADMIN_USER;
            if (payload.userID !== adminID) {
                throw new FormattedException('Forbidden', HttpStatus.FORBIDDEN, 'Insufficient permissions', req.url);
            }

            req.user = payload.userID;
            next();
        } catch (error) {
            if (error instanceof FormattedException) {
                throw error;
            } else if (error instanceof TokenExpiredError) {
                throw new FormattedException('Unauthorized', 401, 'Token expired', req.url);
            } else {
                throw new FormattedException('Unauthorized', 401, 'Invalid token', req.url);
            }
        }
    }
}
