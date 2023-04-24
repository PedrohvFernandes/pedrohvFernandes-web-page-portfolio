import 'dotenv/config.js'

import cors from 'cors'
import express from 'express'
import { router } from './routes.js'

const port = process.env.PORT ?? 4000

const app = express()

app.use(express.json())
app.use(cors({
  origin: 'https://pedrohvfernandes-web-page-portfolio.vercel.app',
  optionsSuccessStatus: 200,
  methods: ['POST']
}))
app.use('/', router)

app.listen(port, () => console.log(`Server running on port ${port}`))
