import express from 'express'
import checkAuth from '../middleware/check-auth.js'
import { routeWrapper } from '../error-handling.js'

const userRouter = express.Router()

userRouter.post("/register", routeWrapper(userHandler.register))
userRouter.post("/login", routeWrapper(userHandler.login))
userRouter.post("/logout", routeWrapper(userHandler.logout))
userRouter.get("/check-login", routeWrapper(userHandler.checkLogin))
userRouter.get("/data", checkAuth, routeWrapper(userHandler.getUserdata))
userRouter.patch("/edit", checkAuth, routeWrapper(userHandler.editUserdata))
userRouter.delete("/delete", checkAuth, routeWrapper(userHandler.deleteUser))

export default userRouter