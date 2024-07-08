import { Request, Response } from 'express'
import { MySQL } from '../../services/connection';
import { FieldPacket, ResultSetHeader } from 'mysql2';

interface CatalogType {
    user_id: number,
    name: string
}

export async function createCatalog(req: Request, res: Response): Promise<Response> {
    const { idUser, nameCatalog } = req.body;

    try {
        const mysql = await MySQL()

        const checkQuery = `SELECT * FROM catalogs WHERE name = ?`
        const [catalogExist]: [ResultSetHeader & CatalogType[], FieldPacket[]] = await mysql.execute(checkQuery, [nameCatalog])

        if (catalogExist.length > 0) {
            await mysql.end()

            return res.status(409).json({ message: 'Catálogo já existente', })
        }

        const query = `INSERT INTO catalogs (user_id, name) VALUES (?, ?)`
        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [idUser, nameCatalog])

        await mysql.end()
        
        if (!result) {
            return res.status(501).json({
                message: "Erro ao criar um catálogo.",
            });
        }

        return res.status(201).json({
            message: "O catálogo foi criado com sucesso.",
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao tentar criar um catálogo :(',
            err
        })
    }
}
