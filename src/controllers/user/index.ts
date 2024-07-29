import { Request, Response } from 'express'
import { MySQL } from '../../services/connection';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import jwt from 'jsonwebtoken'
import { config } from '../../services/jwt';
import { getIdUserToken } from '../../middleware';

interface UserType {
    id: number,
    name: string,
    email: string,
    password: string,
}

export async function login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
        const mysql = await MySQL()
        const query = `SELECT * FROM users WHERE email = ? AND password = ?`
        const [result]: [ResultSetHeader & UserType[], FieldPacket[]] = await mysql.execute(query, [email, password])

        if (result.length < 1) {
            return res.status(400).json({
                message: 'Email ou senha inválidos',
            })
        }

        const token = jwt.sign({
            userName: result[0].name,
            userId: result[0].id,
        }, config.secret, {
            expiresIn: config.expireIn
        })

        return res.status(200).json({
            user: {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email
            },
            message: 'Login realizado',
            token: token
        })

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao tentar fazer o login :(',
            err
        })
    }
}

export async function register(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body

    try {
        const mysql = await MySQL()
        const checkQuery = `SELECT * FROM users WHERE email = ?`
        const [userExist]: [ResultSetHeader & UserType[], FieldPacket[]] = await mysql.execute(checkQuery, [email])

        if (userExist.length > 0) {
            await mysql.end()

            return res.status(409).json({ message: 'Usuário já cadastrado', })
        }

        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [username, email, password])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Erro ao criar o usuário.",
            });
        }


        return res.status(201).json({
            message: "O usuário foi cadastrado com sucesso.",
            user: {
                username
            }
        });

    } catch (err) {
        return res.status(500).json({ message: 'Erro interno do servidor :(', err })
    }
}

export async function checkAuth(req: Request, res: Response): Promise<Response> {
    return res.json("autenticado")
}


export async function getUser(req: Request, res: Response): Promise<Response> {
    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()
        const query = "SELECT * FROM users WHERE id = ?"

        const [result]: [ResultSetHeader & UserType[], FieldPacket[]] = await mysql.execute(query, [idUser])

        await mysql.end()

        if(!result) {
            return res.status(501).json({
                message: "nenhum usuário encontrado :(",
            })
        }

        return res.status(200).json({
            user: {
                name: result[0].name,
                email: result[0].email,
            }
        })

    } catch (err) {
        return res.status(500).json({ message: 'Erro interno do servidor :(', err })
    }
}
