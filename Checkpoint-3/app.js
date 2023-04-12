require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express();
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const user = await prisma.user.findMany()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/', async (req, res) => {
    try {
        const datas = req.body
        const users = await prisma.user.create({data: {...datas}
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(process.env.PORT, () => {
    console.log(`You are connected to the http://localhost:${process.env.PORT}`)
})


