import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {prisma} from "./prisma"

import authRouters from './auth/auth.routes'


const app = express()
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/auth", authRouters)

app.get('/health', async (req, res) => {
  const users = await prisma.user.count()
  res.json({ status: 'ok', users })
})

const PORT = 4000

app.listen(PORT, () => {
  console.log('Server start running..!')
})
