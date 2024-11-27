import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
    user: string;
    [key: string]: any;
}

export function generateToken(payload: JwtPayload): string {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

export function validateToken(token: string): JwtPayload {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof payload === 'string') {
        throw new Error('Invalid token payload');
    }
    return payload as JwtPayload;
}

export function decodeToken(token: string): JwtPayload | null {
    const payload = jwt.decode(token);
    if (!payload || typeof payload === 'string') {
        throw new Error('Invalid token payload');
    }
    return payload as JwtPayload;
}
