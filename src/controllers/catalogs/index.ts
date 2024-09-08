import { Request, Response } from 'express'
import { MySQL } from '../../services/connection';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { getIdUserToken } from '../../middleware';
import { error } from 'console';

interface CatalogType {
    user_id: number,
    name: string
}

export async function createCatalog(req: Request, res: Response): Promise<Response> {
    const { nameCatalog } = req.body;

    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const checkQuery = `SELECT * FROM catalogs WHERE name = ? AND user_id = ?`
        const [catalogExist]: [ResultSetHeader & CatalogType[], FieldPacket[]] = await mysql.execute(checkQuery, [nameCatalog, idUser])

        if (catalogExist.length > 0) {
            await mysql.end()

            return res.status(409).json({
                message: 'Catálogo já existente',
                error: true
            })
        }

        const query = `INSERT INTO catalogs (user_id, name) VALUES (?, ?)`
        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [idUser, nameCatalog])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Erro ao criar um catálogo.",
                error: true
            });
        }

        return res.status(201).json({
            message: "O catálogo foi criado com sucesso.",
            error: false
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao tentar criar um catálogo :(',
            err,
            error: true

        })
    }
}

export async function getCatalog(req: Request, res: Response): Promise<Response> {
    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const query = "SELECT id, name FROM catalogs WHERE user_id = ?"

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [idUser])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Nenhum catálogo encontrado.",
                error: true
            });
        }

        return res.status(201).json({
            message: "Catálogos obtidos com sucesso.",
            error: false,
            result,
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao obter os catálogos :(',
            error: true,
            err
        })
    }
}

export async function getCatalogAndBooks(req: Request, res: Response): Promise<Response> {
    const { search } = req.query;
    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        let query = `
            SELECT
                catalogs.id AS catalog_id,
                catalogs.name AS catalog_name,
                books.imageLinks AS book_image,
                books.id AS book_id
            FROM 
                catalogs
            INNER JOIN 
                books
            ON 
                catalogs.id = books.catalog_id
            WHERE 
                catalogs.user_id = ?
        `

        if (search !== 'show') {
            query += ` AND (catalogs.name LIKE ? OR books.title LIKE ? OR books.author LIKE ?)`;

            const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [idUser,
                `%${search}%`, `%${search}%`, `%${search}%`]
            )

            await mysql.end()

            if(!result) {
                return res.status(201).json({
                    message: "Parece que não tem nada aqui",
                    error: true,
                    result
                })
            }

            return res.status(201).json({
                error: false,
                result
            });
        }

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [idUser])

        await mysql.end()

        return res.status(201).json({
            message: "Catálogos obtidos com sucesso.",
            error: false,
            result
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao obter os catálogos :(',
            error: true,
            err
        })
    }
}



export async function getBooksFromCatalog(req: Request, res: Response): Promise<Response> {
    const { catalogId } = req.params

    try {
        const mysql = await MySQL()

        const query = `Select * from books WHERE catalog_id = ?`

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [catalogId])

        await mysql.end()

        return res.status(201).json({
            error: false,
            result
        })

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao obter os catálogos :(',
            error: true,
            err
        })
    }
}


export async function PutDayRead(req: Request, res: Response): Promise<Response> {
    const { catalogId, seconds, isRead, day } = req.body

    try {

        const mysql = await MySQL()

        const query = 'INSERT INTO schedule (catalog_id, seconds, is_read, day) VALUES (?,?,?,?)'

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [catalogId, seconds, isRead, day])

        await mysql.end()

        return res.status(200).json({
            message: 'Dia concluido',
            result
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao obter os catálogos :(',
            error: true,
            err
        })
    }
}


