import { db } from './db.js';
import fs from 'fs';
import path from 'path';

async function setupDatabase() {
  try {
    // Lies deine SQL-Datei ein (speichere dein SQL-Skript als schema.sql)
    const sqlPath = path.resolve(process.cwd(), 'src/database/schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log("⏳ Erstelle Tabellen in der Test-Datenbank...");
    
    // Wir spalten das Skript an den Semikolons auf, um die Befehle einzeln auszuführen
    const queries = sql.split(';').filter(query => query.trim() !== "");
    
    for (let query of queries) {
      await db.query(query);
    }

    console.log("✅ Datenbank-Schema erfolgreich importiert!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Fehler beim Erstellen der Datenbank:", err);
    process.exit(1);
  }
}

setupDatabase();