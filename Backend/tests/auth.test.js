import request from 'supertest';
import { app } from '../src/app.js'; // Deine Express-App
import { db } from '../src/database/db.js';

describe('Auth System Integration', () => {
  
  // Vor jedem Test die User-Tabelle leeren, damit wir immer bei Null anfangen
  beforeEach(async () => {
    await db.query("SET FOREIGN_KEY_CHECKS = 0");
    await db.query("TRUNCATE TABLE Users");
    await db.query("SET FOREIGN_KEY_CHECKS = 1");
  });

  afterAll(async () => {
    await db.end(); // Verbindung nach den Tests schließen
  });

  it('sollte einen neuen User in MariaDB anlegen', async () => {
    const res = await request(app)
      .post('/api/register') // Dein Route-Pfad
      .send({
        username: 'MariaDB_User',
        email: 'test@maria.db',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // Datenbank-Check: Existiert der User wirklich in der Tabelle?
    const [user] = await db.query("SELECT * FROM Users WHERE username = 'MariaDB_User'");
    expect(user.length).toBe(1);
    expect(user[0].username).toBe('MariaDB_User');
  });
});