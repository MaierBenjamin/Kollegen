import express from 'express'
import checkAuth from '../middleware/check-auth.js'
import { routeWrapper } from '../error-handling.js'
import * as chatHandler from '../handlers/chats.js'


const chatRouter = express.Router()

chatRouter.post("/send", checkAuth, routeWrapper(chatHandler.sendMessage))
chatRouter.get("/single", checkAuth, routeWrapper(chatHandler.getChat))
chatRouter.get("/", checkAuth, routeWrapper(chatHandler.getAllChats))

export default chatRouter