import { Request, Response } from 'express'
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
    publication_date: string,
    pages: number,
    description: string,
    imageLinks: string,
    isbn?: number | string
}

export async function addBook(req: Request, res: Response): Promise<Response> {
    const { book, CatalogSelect }: ReqType = req.body;

    try {
        const mysql = await MySQL()

        const query = 'INSERT INTO books (catalog_id, idResBook, title, author, isbn, publisher, publication_date, pages, description, imageLinks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        const [result] = await mysql.execute(query, [
            CatalogSelect,
            book.idResBook,
            book.title,
            book.authors.join(', '),
            book.isbn,
            book.publisher,
            book.publishedDate,
            book.pages,
            book.description,
            book.imageLinks,
        ])

        await mysql.end()

        return res.status(200).json({
            message: 'Livro adicionado com sucesso',
            error: false,
            result
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao adicionar o livro :(',
            error: true,
            err
        })
    }
}

export async function getBook(req: Request, res: Response): Promise<Response> {
    const { bookId } = req.params;

    try {
        const mysql = await MySQL()

        const query = 'SELECT * FROM books WHERE id = ?'
        const [result]: [ResultSetHeader & BookType[], FieldPacket[]] = await mysql.execute(query, [bookId])

        await mysql.end()

        return res.status(200).json({
            message: 'Livro encontrado com sucesso',
            error: false,
            book: {
                title: result[0].title,
                author: result[0].author,
                publisher: result[0].publisher,
                pages: result[0].pages,
                description: result[0].description,
                isbn: result[0].isbn,
                publishedDate: result[0].publication_date,
                imageLinks: result[0].imageLinks,
            },
        })


    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu algum erro ao buscar o livro :(',
            error: true,
            err
        })
    }
}

export async function deleteBook(req: Request, res: Response): Promise<Response> {
    const { bookId } = req.params;

    try {
        const mysql = await MySQL()

        const query = 'DELETE FROM books WHERE id = ?'
        const [result]: [ResultSetHeader & BookType[], FieldPacket[]] = await mysql.execute(query, [bookId])

        await mysql.end()

        if(result.length < 0) {
            return res.status(409).json({
                message: 'Livro deletado com sucesso',
                error: false,
            })
        }

        return res.status(200).json({
            message: 'Livro deletado com sucesso',
            error: false,
        })

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu algum erro ao deletar o livro :(',
            error: true,
            err
        })
    }
}