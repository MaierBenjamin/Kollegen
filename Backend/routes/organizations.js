import express from 'express'
import checkAuth from '../middleware/check-auth.js'
import { routeWrapper } from '../error-handling.js'
import * as organizationHandler from '../handlers/organizations.js'

const organizationRouter = express.Router()

organizationRouter.get("/", checkAuth, routeWrapper(organizationHandler.getOrganizations))
organizationRouter.get("/single", checkAuth, routeWrapper(organizationHandler.getOrganization))
organizationRouter.post("/set-selected", checkAuth, routeWrapper(organizationHandler.setSelectedOrganization))
organizationRouter.get("/selected", checkAuth, routeWrapper(organizationHandler.selectedOrganization))
organizationRouter.get("/users", checkAuth, routeWrapper(organizationHandler.getUsers))
organizationRouter.post("/create", checkAuth, routeWrapper(organizationHandler.createOrganization))
organizationRouter.delete("/delete", checkAuth, routeWrapper(organizationHandler.deleteOrganization))
organizationRouter.patch("/edit", checkAuth, routeWrapper(organizationHandler.editOrganization))
organizationRouter.patch("/toggle-admin", checkAuth, routeWrapper(organizationHandler.toggleAdmin))
organizationRouter.post("/join", checkAuth, routeWrapper(organizationHandler.joinOrganization))
organizationRouter.delete("/leave", checkAuth, routeWrapper(organizationHandler.leaveOrganization))

export default organizationRouter