import request from 'supertest';
import { app } from '../src/app.js'; // Deine Express-App exportiert
import { clearDatabase, closeConnection } from './setup.js';

const agent = request.agent(app);

beforeAll(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeConnection();
});

describe('User Auth Flow', () => {
  
  const testUser = {
    username: 'testadmin',
    email: 'admin@test.de',
    password: 'SafePassword123!'
  };

  it('sollte einen User registrieren (Register)', async () => {
    const res = await agent
      .post('/register')
      .send(testUser);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('sollte den Login verweigern bei falschem Passwort', async () => {
    const res = await agent
      .post('/login')
      .send({ username: testUser.username, password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Wrong password");
  });

  it('sollte sich einloggen und Zugriff auf geschützte Daten haben', async () => {
    // 1. Login
    const loginRes = await agent
      .post('/login')
      .send({ username: testUser.username, password: testUser.password });
    
    expect(loginRes.status).toBe(200);

    // 2. Userdaten abrufen (Session muss aktiv sein)
    const dataRes = await agent.get('/userdata');
    
    expect(dataRes.status).toBe(200);
    expect(dataRes.body.user.username).toBe(testUser.username);
  });

  it('sollte nach dem Logout keinen Zugriff mehr haben', async () => {
    await agent.post('/logout');
    
    const checkRes = await agent.get('/check-login');
    expect(checkRes.body.loggedIn).toBe(false);
  });
});