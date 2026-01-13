import express from 'express'
import session from 'express-session'
import cors from 'cors'
import dotenv from 'dotenv'

import userRouter from './routes/users.js'
import groupRouter from './routes/groups.js'
import organizationRouter from './routes/organizations.js'
import chatRouter from './routes/chats.js'

import { createSessionStore } from './database/db.js'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.ORIGIN_URL,
  credentials: true
}))
app.set('trust proxy', Number(process.env.PROXY_NUMBER))

const sessionStore = createSessionStore()
const isProd = process.env.NODE_ENV == "production"

// Express session config
app.use(session({
  key: "SessionId",
  secret: process.env.SESSION_SECRET || 'fallback_secret', // Fallback für Tests
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd,
    httpOnly: true,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

// Routes
app.use("/users", userRouter)
app.use("/groups", groupRouter)
app.use("/chats", chatRouter)
app.use("/organizations", organizationRouter)

// WICHTIG: Export für Supertest (muss vor dem app.listen Block stehen)
export { app }; 

// Server nur starten, wenn wir NICHT im Test-Modus sind
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
}