import { Request, Response } from 'express'
import { MySQL } from '../../services/connection';
import { FieldPacket, ResultSetHeader } from 'mysql2';

interface UserType {
    id: number,
    email: string,
    password: string,
}

export async function login(req: Request, res: Response): Promise<Response>{
    const { email, password } = req.body;

    try {

        const mysql = await MySQL()
        const query = `SELECT * FROM users WHERE email = ? AND password = ?`
        const [result]: [ResultSetHeader & UserType[], FieldPacket[]] = await mysql.execute(query, [email, password])

        if(result.length < 1) {
            return res.status(400).json({
                message: 'Email ou senha inválidos',  
            })
        }

        return res.status(201).json({
            result,
            message: 'Login realizado',
        })

    }catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao tentar fazer o login :(',
            err
        })
    }
}