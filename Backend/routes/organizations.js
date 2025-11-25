import express from 'express'
import checkAuth from '../middleware/check-auth.js'
import { routeWrapper } from '../error-handling.js'

const organizationRouter = express.Router()

organizationRouter.post("/create", checkAuth, routeWrapper(organizationHandler.createOrganization))
organizationRouter.delete("/delete", checkAuth, routeWrapper(organizationHandler.deleteOrganization))
organizationRouter.patch("/edit", checkAuth, routeWrapper(organizationHandler.editOrganization))
organizationRouter.patch("/change-userrole", checkAuth, routeWrapper(organizationHandler.chengeUserRole))
organizationRouter.post("/join", checkAuth, routeWrapper(organizationHandler.joinOrganization))
organizationRouter.delete("/delete", checkAuth, routeWrapper(organizationHandler.leaveOrganization))

export default organizationRouter