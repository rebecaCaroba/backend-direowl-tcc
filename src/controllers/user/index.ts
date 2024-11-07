import { Request, Response } from 'express'
import { MySQL } from '../../services/connection';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import jwt from 'jsonwebtoken'
import { config } from '../../services/jwt';
import { getIdUserToken } from '../../middleware';
import { error } from 'console';

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

        await mysql.end()

        if (result.length < 1) {
            return res.status(400).json({
                message: 'Email ou senha inválidos',
                error: true,
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
            token: token,
            error: false,
        })

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao tentar fazer o login :(',
            err,
            error: true,
        })
    }
}

export async function register(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body

    try {
        const mysql = await MySQL()
        const checkQuery = `SELECT * FROM users WHERE email = ? OR name = ?`
        const [userExist]: [ResultSetHeader & UserType[], FieldPacket[]] = await mysql.execute(checkQuery, [email, username])

        if (userExist.length > 0) {
            await mysql.end()

            return res.status(409).json({
                message: 'O nome de usuário ou e-mail já está em uso',
                error: true 
            })
        }

        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [username, email, password])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Erro ao criar o usuário.",
                error: true,
            });
        }


        return res.status(201).json({
            message: "O usuário foi cadastrado com sucesso.",
            error: false,
            user: {
                username
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Erro interno do servidor :(',
            err,
            error: true,
        })
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

        if (!result) {
            return res.status(501).json({
                message: "nenhum usuário encontrado :(",
                error: true,
            })
        }

        return res.status(200).json({
            user: {
                name: result[0].name,
                email: result[0].email,
            },
            error: false,
        })

    } catch (err) {
        return res.status(500).json({ 
            message: 'Erro interno do servidor :(',
            err,
            error: true,
        })
    }
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
    const { newUsername } = req.body
    const userId = await getIdUserToken(req)

    try {
        const mysql = await MySQL()
        
        const checkQuery = `SELECT * FROM users WHERE name = ?`
        const [userExist]: [ResultSetHeader & UserType[], FieldPacket[]] = await mysql.execute(checkQuery, [newUsername])

        if (userExist.length > 0) {
            await mysql.end()

            return res.status(409).json({
                message: 'Este nome já está em uso',
                error: true 
            })
        }

        const query = "UPDATE users SET name = ? WHERE id = ?"

        const [result]: [ResultSetHeader & UserType[], FieldPacket[]] = await mysql.execute(query, [newUsername, userId])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Não foi possível alterar o nome",
                error: true,
            })
        }

        return res.status(200).json({
            message: "Nome alterado com sucesso",
            error: false,
        })

    } catch (err) {
        return res.status(500).json({ 
            message: 'Erro interno do servidor :(',
            err,
            error: true,
        })
    }
}

export async function updatePassword(req: Request, res: Response): Promise<Response> {
    const { password } = req.body

    const userId = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const query = "UPDATE users SET password = ? WHERE id = ?"
        const [result]: [ResultSetHeader & UserType[], FieldPacket[]] = await mysql.execute(query, [password, userId])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Não foi possível alterar a senha",
                error: true,
            })
        }

        return res.status(200).json({
            message: "Senha alterada com sucesso",
            error: false,
        })

    } catch (err) {
        return res.status(500).json({ 
            message: 'Erro interno do servidor :(',
            err,
            error: true,
        })
    }
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const query = `DELETE FROM users WHERE id = ?`

        const [result]: [ResultSetHeader[], FieldPacket[]] = await mysql.execute(query, [idUser])

        await mysql.end()

        if (result.length < 0) {
            return res.status(201).json({
                message: 'Erro ao deletar o usuário',
                error: true,
            })
        }

        return res.status(201).json({
            message: 'Usuário deletado com sucesso',
            error: false,
        })

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao deletar sua conta :(',
            error: true,
            err
        })
    }
}
