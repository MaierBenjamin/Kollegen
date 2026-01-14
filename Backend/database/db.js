import mysql from "mysql2/promise"
import session from "express-session"
import connectMySQL from "express-mysql-session"
import dotenv from "dotenv"
import path from "path"


const envPath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envPath) });

const MySQLStore = connectMySQL(session)

const dbOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,
  connectionLimit: 20,
  enableKeepAlive: true,
}

export const db = mysql.createPool(dbOptions)

export function createSessionStore() { 
  return new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000,
  }, db); 
}

if (process.env.NODE_ENV !== 'test') {
  setInterval(async () => {
    db.query('SELECT 1').catch(() => console.error("DB keep-alive failed"));
  }, 1000 * 60 * 5);
}