import express from 'express'
import checkAuth from '../middleware/check-auth.js'
import { routeWrapper } from '../error-handling.js'
import upload from '../middleware/upload.js'
import * as groupHandler from '../handlers/groups.js'

const groupRouter = express.Router()

groupRouter.get("/", checkAuth, routeWrapper(groupHandler.getGroups))
groupRouter.post("/create", checkAuth, routeWrapper(groupHandler.createGroup))
groupRouter.delete("/delete", checkAuth, routeWrapper(groupHandler.deleteGroup))
groupRouter.patch("/edit", checkAuth, routeWrapper(groupHandler.editGroup))
groupRouter.post("/join", checkAuth, routeWrapper(groupHandler.joinGroup))
groupRouter.delete("/leave", checkAuth, routeWrapper(groupHandler.leaveGroup))
groupRouter.post("/channel/send-message", checkAuth, routeWrapper(groupHandler.sendChannelMessage))
groupRouter.post("/channel/create", checkAuth, routeWrapper(groupHandler.createChannel))
groupRouter.delete("/channel/delete", checkAuth, routeWrapper(groupHandler.deleteChannel))
groupRouter.patch("/channel/edit", checkAuth, routeWrapper(groupHandler.editChannel))
groupRouter.post("/channel/upload", checkAuth, upload("./data/channel-files"), routeWrapper(groupHandler.uploadChannelFile))
groupRouter.get("/channel/files", checkAuth, routeWrapper(groupHandler.showChannelFiles))
groupRouter.get("/channel/download", checkAuth, routeWrapper(groupHandler.downloadChannelFile))

export default groupRouter