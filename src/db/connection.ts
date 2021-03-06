import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10)
}

const pool = new Pool(credentials)

export default pool
