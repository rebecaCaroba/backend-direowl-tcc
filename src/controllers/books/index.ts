import { Request, Response } from 'express'
import { MySQL } from '../../services/connection';

interface ReqType {
    book: {
    title: string,
    authors: string[],
    publisher: string,
    publishedDate: string,
    pages: number,
    description: string,
    imageLink: string,
    isbn10?: number | string
    isbn13?: number | string
    }
    CatalogSelect: number

}

export async function addBook(req: Request, res: Response): Promise<Response> {
    const { book, CatalogSelect } : ReqType = req.body;

    try {
        const mysql = await MySQL()

            const query = 'INSERT INTO books (catalog_id, isbn, title, author, publisher, publication_date, pages, description, imageslink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
            const [result] = await mysql.execute(query, [
                CatalogSelect,
                book.isbn13,
                book.title,
                book.authors.join(', '),
                book.publisher,
                book.publishedDate,
                book.pages,
                book.description,
                book.imageLink,
              ])

        return res.status(200).json({
            message: 'Livro adicionado com sucesso',
            result,
        })
        

    } catch (err) {
        return res.status(500).json({
            message: 'Ocorreu um erro ao adicionar o livro :(',
            err
        })
    }
}
