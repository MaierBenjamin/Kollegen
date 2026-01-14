import mysql from "mysql2/promise"
import session from "express-session"
import connectMySQL from "express-mysql-session"
import dotenv from "dotenv"
import path from "path"

// 1. Dynamisches Laden der .env Datei
const envPath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envPath) });

const MySQLStore = connectMySQL(session)

const dbOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, // Hier muss PASSWORD stehen, passend zur .env!
  database: process.env.DB_NAME,
  connectionLimit: 20,
  enableKeepAlive: true,
}

export const db = mysql.createPool(dbOptions)

// 2. Session Store an den Pool binden
export function createSessionStore() { 
  // Wir geben die dbOptions mit, damit der Store weiß, welche DB er nutzen soll
  return new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000,
  }, db); 
}

// 3. Keep-Alive nur im echten Betrieb (nicht während der Tests)
if (process.env.NODE_ENV !== 'test') {
  setInterval(async () => {
    db.query('SELECT 1').catch(() => console.error("DB keep-alive failed"));
  }, 1000 * 60 * 5);
}