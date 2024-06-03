import mysql from 'mysql2'

export async function MySQL() {
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'direowldb',
    password: '',
});

const pool = connection.promise()
return pool
}