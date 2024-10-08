import { Request, Response } from 'express'
import { getIdUserToken } from "../../middleware";
import { MySQL } from "../../services/connection";
import { FieldPacket, ResultSetHeader } from 'mysql2';

interface ScheduleType {
    title: string,
    author: string,
    publisher: string,
    pages: number,
    description: string,
    imageLinks: string
}

export async function createSchedule(req: Request, res: Response): Promise<Response> {
    const { minutesDay, amoutPags, totalMinutes, daysToRead, bookId } = req.body;

    const bookIdNumber = Number(bookId)
    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const query = `INSERT INTO schedule (book_id, user_id, total_days, total_minutes, minutes_per_day, total_pages) VALUES (?, ?, ?, ?, ?, ?)`

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [bookIdNumber, idUser, daysToRead, totalMinutes, minutesDay, amoutPags])

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
            result: {
                id: result.insertId,
            }
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao tentar criar um cronogrâma :(',
            error: true,
            err
        })
    }
}

export async function deleteSchedule(req: Request, res: Response): Promise<Response> {
    const { scheduleId } = req.params

    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const query = "DELETE from schedule WHERE id = ? AND user_id = ?"

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [scheduleId, idUser])

        await mysql.end()

        return res.status(201).json({
            message: "Cronograma deletado com sucesso",
            error: false,

        })

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao deletar o cronograma :(',
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

        const query = `
            SELECT 
                schedule.id AS schedule_id,
                dayread.id AS dayread_id,
                schedule.minutes_per_day,
                schedule.total_days,
                schedule.total_minutes,
                dayread.day,
                dayread.seconds,
                dayread.is_read
            FROM 
                schedule
            INNER JOIN 
                dayread 
            ON 
                schedule.id = dayread.schedule_id
            WHERE 
                schedule.book_id = ?
            AND 
                schedule.user_id = ?
            ORDER BY 
                schedule.id, dayread.day;
        `

        const [result]: [ResultSetHeader & ScheduleType[], FieldPacket[]] = await mysql.execute(query, [bookId, idUser])

        await mysql.end()

        if (result.length <= 0) {
            return res.status(201).json({
                message: "Nenhum cronogrâma encontrado.",
                error: true,
                result,
            })
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

export async function CreateDayRead(req: Request, res: Response): Promise<Response> {
    const { schedule_id, day, seconds, is_read } = req.body;

    try {
        const mysql = await MySQL()

        const query = "INSERT INTO dayread ( schedule_id, seconds, is_read, day ) VALUES(?,?,?,?)"

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [schedule_id, seconds, is_read, day])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Erro ao criar um dia.",
                error: true,
            });
        }

        return res.status(201).json({
            message: "Dia criado com sucesso.",
            error: false,
            result
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao criar um dia :(',
            error: true,
            err
        })
    }
}

export async function completedDay(req: Request, res: Response): Promise<Response> {
    const { dayreadId, timeInSeconds, is_read } = req.body;

    try {
        const mysql = await MySQL()

        const query = 'UPDATE dayread SET is_read = ?, seconds = ? WHERE id = ?'

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [is_read, timeInSeconds, dayreadId])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Erro ao concluir o dia",
                error: true,
            });
        }

        return res.status(201).json({
            message: "Dia concluído com sucesso.",
            error: false,
            result
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao concluir um dia :(',
            error: true,
            err
        })
    }
}


export async function completeSchedule(req: Request, res: Response): Promise<Response> {
    const { schedule_id, complete } = req.body;

    try {
        const mysql = await MySQL()

        const query = 'UPDATE schedule SET complete = ? WHERE id = ?'

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [complete, schedule_id])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Erro ao concluir o cronograma",
                error: true,
            });
        }

        return res.status(201).json({
            message: "Parabéns! Você concluiu o cronograma :D",
            error: false,
            result
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao concluir o cronograma :(',
            error: true,
            err
        })
    }
}

export async function getAllSchedule(req: Request, res: Response): Promise<Response> {
    const idUser = await getIdUserToken(req)

    try {
        const mysql = await MySQL()

        const query = `
        SELECT 
            schedule.id AS schedule_id,
            schedule.user_id,
            schedule.complete,
            books.id AS book_id,
            books.title AS book_title,
            books.imageLinks
        FROM 
            schedule
        INNER JOIN 
            books
        ON 
            schedule.book_id = books.id
        WHERE 
            schedule.user_id = ?
    `

        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [idUser])

        await mysql.end()

        if (!result) {
            return res.status(501).json({
                message: "Erro ao buscar todos os cronogramas",
                error: true,
            });
        }

        return res.status(201).json({
            message: "Cronogramas obtidos com sucesso.",
            error: false,
            result
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao buscar os cronogramas :(',
            error: true,
            err
        })
    }
}




