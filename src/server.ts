import express from 'express'
import cors from 'cors'
import { router } from './routes';

const server = express()
server.use(cors());
server.use(express.json())
server.use('/api', router)

server.listen(3333, () => console.log('Rodando...'))