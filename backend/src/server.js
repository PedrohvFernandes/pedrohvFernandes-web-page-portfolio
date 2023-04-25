import 'dotenv/config.js'

import cors from 'cors'
import express from 'express'
import { router } from './routes.js'

// PORT = A porta que a plataforma(vercel) de deploy vai oferecer --> colocar ela so na parte de produção da plataforma
const PORT = process.env.PORT ?? 4000
// PRODORDEV = seudominion.com --> colocar ela so na parte de produção da plataforma(vercel)
const PRODORDEV = process.env.PRODORDEV ?? 'http://localhost:3000'

const app = express()

app.use(express.json())
app.use(cors({
  origin: PRODORDEV,
  optionsSuccessStatus: 200,
  methods: ['POST']
}))
app.use('/', router)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
