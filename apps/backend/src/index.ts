import express from 'express'
import cors from 'cors'

import {prisma} from "./prisma"

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', async (req, res) => {
  const users = await prisma.user.count()
  res.json({ status: 'ok', users })
})

const PORT = 4000

app.listen(PORT, () => {
  console.log('Server start running..!')
})
