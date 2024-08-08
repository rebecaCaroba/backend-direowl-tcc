import { Request, Response } from 'express'
import { getIdUserToken } from "../../middleware";
import { MySQL } from "../../services/connection";
import { FieldPacket, ResultSetHeader } from 'mysql2';

export async function createTimeline(req: Request, res: Response): Promise<Response> {
    const { minutesDay, amoutPags, pagesDay, daysToRead, bookId } = req.body;

    const bookIdNumber = Number(bookId)
    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const query = `INSERT INTO timeline (book_id, user_id, total_days, pages_per_day, minutes_per_day,total_pages) VALUES (?, ?, ?, ?, ?, ?)`

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [bookIdNumber, idUser, daysToRead, pagesDay, minutesDay, amoutPags])

        await mysql.end()
        
        if (!result) {
            return res.status(501).json({
                message: "Erro ao criar o cronogrâma literário.",
            })
        }

        return res.status(201).json({
            message: "O cronogrâma literário foi criado com sucesso.",
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao tentar criar um cronogrâma :(',
            err
        })
    }
}
