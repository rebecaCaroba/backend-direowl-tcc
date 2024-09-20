import { Request, Response, NextFunction } from 'express'
import { MySQL } from '../../services/connection';
import { FieldPacket, ResultSetHeader } from 'mysql2';

interface ReqType {
    book: {
        idResBook: string
        title: string,
        authors: string[],
        publisher: string,
        publishedDate: string,
        pages: number,
        description: string,
        imageLinks: string,
        isbn: number | string
    }
    CatalogSelect: number

}

interface BookType {
    title: string,
    author: string[],
    publisher: string,
    publishedDate: string,
    pages: number,
    description: string,
    imageLinks: string,
    isbn: number | string
}

export async function verifyBook(req: Request, res: Response, next: NextFunction) {
    const { book, CatalogSelect }: ReqType = req.body;

    try {
        const mysql = await MySQL()

        const query = 'SELECT * FROM books WHERE idResBook = ? AND catalog_id = ?'

        const [result]: [ResultSetHeader & BookType[], FieldPacket[]] = await mysql.execute(query, [book.idResBook, CatalogSelect])

        mysql.end()

        if(result.length > 0) {
            return res.status(400).json({
                message: 'Livro já está no catálogo',
                error: true
            })
        }

        next();

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao adicionar o livro :(',
            error: true,
            err
        })
    }
}