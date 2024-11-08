import mysql from 'mysql2'
require('dotenv').config()

export async function MySQL() {
const connection = mysql.createPool({
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    user:   process.env.USER,
    database:  process.env.DATABASE,
    password:  process.env.PASSWORD,
});

const pool = connection.promise()
return pool
}