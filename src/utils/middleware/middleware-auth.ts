import { Injectable, NestMiddleware } from '@nestjs/common';
import { FormattedException } from '../exceptions/http-exception/formatted-exeption';
import { validateToken } from '../auth/auth';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: Error | any) => void) {
        try {
            const token = req.headers.authorization;
            if (!token) throw new FormattedException('Unauthorized', 401, 'No token provided', req.url);
            const payload = validateToken(token);
            req.user = payload;
            next();
        } catch (error) {
            res.status(401).send({ error });
        }
    }
}
