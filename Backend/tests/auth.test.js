import request from 'supertest';
import { app } from '../server.js'; 
import { db } from '../database/db.js'; 

describe('Auth System Integration', () => {
  
  beforeEach(async () => {
    await db.query("SET FOREIGN_KEY_CHECKS = 0");
    // Falls deine Tabelle in der DB "Users" (groß) heißt, hier anpassen!
    await db.query("TRUNCATE TABLE users"); 
    await db.query("SET FOREIGN_KEY_CHECKS = 1");
  });

  afterAll(async () => {
    await db.end(); 
  });

  it('sollte einen neuen User in MariaDB anlegen', async () => {
    const res = await request(app)
      .post('/users/register') 
      .send({
        username: 'MariaDB_User',
        email: 'test@maria.db',
        password: 'password123'
      });

    // Zeigt uns im Terminal an, warum der Controller mit 500 antwortet
    if (res.statusCode !== 200) {
      console.log("❌ Fehler-Details vom Server:", res.body);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const [rows] = await db.query("SELECT * FROM users WHERE username = 'MariaDB_User'");
    expect(rows.length).toBe(1);
    expect(rows[0].username).toBe('MariaDB_User');
  });
});