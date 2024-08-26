import { Request, Response } from 'express'
import { getIdUserToken } from "../../middleware";
import { MySQL } from "../../services/connection";
import { FieldPacket, ResultSetHeader } from 'mysql2';

export async function createSchedule(req: Request, res: Response): Promise<Response> {
    const { minutesDay, amoutPags, pagesDay, daysToRead, bookId } = req.body;

    const bookIdNumber = Number(bookId)
    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const query = `INSERT INTO schedule (book_id, user_id, total_days, pages_per_day, minutes_per_day,total_pages) VALUES (?, ?, ?, ?, ?, ?)`

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [bookIdNumber, idUser, daysToRead, pagesDay, minutesDay, amoutPags])

        await mysql.end()
        
        if (!result) {
            return res.status(501).json({
                message: "Erro ao criar o cronogrâma literário.",
                error: true,

            })
        }

        return res.status(201).json({
            message: "O cronogrâma literário foi criado com sucesso.",
            error: false,

        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao tentar criar um cronogrâma :(',
            error: true,
            err
        })
    }
}

export async function getSchedule(req: Request, res: Response): Promise<Response> {
    const { bookId } = req.params;

    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const query = "SELECT * FROM schedule WHERE user_id = ? AND book_id = ?"

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [idUser, bookId ])

        await mysql.end()
        
        if (!result) {
            return res.status(501).json({
                message: "Nenhum cronogrâma encontrado.",
                error: true,
            });
        }

        return res.status(201).json({
            message: "Cronogrâma obtidos com sucesso.",
            error: false,
            result
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao obter o cronogrâma :(',
            error: true,
            err
        })
    }
}

export async function completedSchedule(req: Request, res: Response): Promise<Response> {
    const { bookId, dayRead, timeInSeconds } = req.body;
    console.log(dayRead)

    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const queryUpdate = `
            UPDATE schedule 
            SET last_day_read = ?, seconds = ? 
            WHERE user_id = ? AND book_id = ?
        `

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(queryUpdate, [dayRead, timeInSeconds, idUser, bookId])

        await mysql.end()
        
        if (!result) {
            return res.status(501).json({
                message: "Nenhum cronograma encontrado.",
                 error: true,
            });
        }
        
        return res.status(201).json({
            message: "Cronograma atualizado com sucesso.",
            error: false,
            result
        })

    
    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao atualizar o cronogrâma :(',
            error: true,
            err
        })
    }
}

