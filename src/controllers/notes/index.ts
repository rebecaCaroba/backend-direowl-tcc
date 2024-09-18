import { Request, Response } from 'express'
import { MySQL } from '../../services/connection';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { text } from 'stream/consumers';

interface NoteType {
    id: number
    bookId: number
    text: string
    created_at: Date
}    

export async function addNotes(req: Request, res: Response): Promise<Response> {
    const { text, bookId } = req.body;

    try {
        const mysql = await MySQL()

        const query = 'INSERT INTO notes (book_id, text) VALUES (?, ?)'
        const [result]: [ResultSetHeader & NoteType[], FieldPacket[]]  = await mysql.execute(query, [bookId, text])

        await mysql.end()

        if(result.length <= 0) {
            return res.status(200).json({
                message: 'Erro ao adicionar uma nota',
                error: true,
            })
        }

        return res.status(200).json({
            message: 'Nota adicionada com sucesso',
            error: false,
            result
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao adicionar uma nota :(',
            error: true,
            err
        })
    }
}

export async function getNotes(req: Request, res: Response): Promise<Response> {
    const { bookId } = req.params;

    try {
        const mysql = await MySQL()

        const query = 'SELECT * FROM notes WHERE book_id = ?'
        const [result]: [ResultSetHeader, FieldPacket[]] = await mysql.execute(query, [bookId])

        await mysql.end()

        return res.status(200).json({
            message: 'Notas encontradas com sucesso',
            error: false,
            result
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu algum erro ao buscar o livro :(',
            error: true,
            err
        })
    }
}

export async function deleteNotes(req: Request, res: Response): Promise<Response> {
    const { notesId } = req.params;

    try {
        const mysql = await MySQL()

        const query = 'DELETE FROM notes WHERE id = ?'
        const [result]: [ResultSetHeader & NoteType[], FieldPacket[]] = await mysql.execute(query, [notesId])

        await mysql.end()

        if(result.length <= 0) {
            return res.status(409).json({
                message: 'Erro ao deletar a nota',
                error: true,
            })
        }

        return res.status(200).json({
            message: 'Nota deletada com sucesso',
            error: false,
        })

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu algum erro ao deletar a nota :(',
            error: true,
            err
        })
    }
}