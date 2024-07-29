import { JwtPayload, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'
import { config } from "../services/jwt";
import { MySQL } from '../services/connection';

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const tokenBearer = req.headers['authorization']

    if (!tokenBearer) {
        return res.status(406).json({
            error: true,
            message: 'Não autorizado'
        });
    }

    const token = tokenBearer.split(' ')[1];
    try {
        const { userId } = verify(token, config.secret) as JwtPayload;

        const mysql = await MySQL();
        const query = 'SELECT * FROM users WHERE id = ?';
        const [result]: any = await mysql.execute(query, [userId]);

        if (!(result.length > 0)) {
            return res.status(406).json({
                error: true,
                message: 'O token está inválido'
            });
        }

        next();

    } catch (err) {
        return res.status(406).json({
            error: true,
            message: 'O token está inválido'
        });
    }
}

export async function getIdUserToken(req: Request) {
    const tokenBearer = req.headers['authorization'];

    if (!tokenBearer) {
        return null
    }

    const token = tokenBearer.split(' ')[1];
    const { userId } = verify(token, config.secret) as JwtPayload;
    return userId
}