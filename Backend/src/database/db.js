import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Pfad zur entsprechenden .env Datei bestimmen (test oder normal)
const envPath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

// Konfiguration laden
dotenv.config({ path: path.resolve(process.cwd(), envPath) });

// Pool-Konfiguration erstellen
const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Hilfreich für Fehlersuche:
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Den Pool erstellen
export const db = mysql.createPool(poolConfig);

// Kurzer Verbindungstest beim Start (optional, aber empfohlen)
db.getConnection()
  .then(connection => {
    console.log(`✅ Verbunden mit Datenbank: ${process.env.DB_NAME} (${process.env.NODE_ENV || 'development'})`);
    connection.release();
  })
  .catch(err => {
    console.error('❌ Datenbankverbindung fehlgeschlagen:', err.message);
  });