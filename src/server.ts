import express from 'express'
import cors from 'cors'
import { router } from './routes';

const server = express()
server.use(cors());
server.use(express.json())
server.use('/api', router)

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => console.log('Rodando...'))