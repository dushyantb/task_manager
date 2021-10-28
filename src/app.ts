import cors from 'cors'
import express from 'express'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/', routes)

export default app
