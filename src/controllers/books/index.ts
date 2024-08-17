import { Request, Response } from 'express'
import { MySQL } from '../../services/connection';
import { FieldPacket, ResultSetHeader } from 'mysql2';

interface ReqType {
    book: {
        title: string,
        authors: string[],
        publisher: string,
        publishedDate: string,
        pages: number,
        description: string,
        imageLinks: string,
        isbn10?: number | string
        isbn13?: number | string
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
    isbn13?: number | string
}

export async function addBook(req: Request, res: Response): Promise<Response> {
    const { book, CatalogSelect }: ReqType = req.body;

    try {
        const mysql = await MySQL()

        const query = 'INSERT INTO books (catalog_id, isbn, title, author, publisher, publication_date, pages, description, imageLinks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        const [result] = await mysql.execute(query, [
            CatalogSelect,
            book.isbn13,
            book.title,
            book.authors.join(', '),
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
                publishedDate: result[0].publishedDate,
                pages: result[0].pages,
                description: result[0].description,
                imageLinks: result[0].imageLinks,
                isbn13: result[0].isbn13
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
