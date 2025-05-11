import { config } from 'dotenv'
// Load .env
config()

let exported = {
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET
}

export default exported