import { db } from '../database/db.js'
import { safeOperation, checkReq } from '../error-handling.js'
import crypto from 'node:crypto'

export async function getOrganizations(req, res) {
  const [organizations] = await safeOperation(
    () => db.query(
      `select organizationId, name from organization_users
      join organizations on fk_OrganizationId = organizationId
      where fk_UserId = ?`,
      [req.session.user.id]
    ),
    "Error while retrieving organizations from database"
  )

  res.status(200).json({success: true, message: "Successfully retrieved organizations from database", organizations})
}

export async function getOrganization(req, res) {
  const {organizationId} = req.query
  checkReq(!organizationId)

  const [[organization]] = await safeOperation(
    () => db.query(
      "select organizationId, name, description, joinUUID from organizations where organizationId = ?", 
      [organizationId]
    ),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  
  res.status(200).json({success: true, message: "Successfully retrieved organization from database", organization})
}

export async function selectedOrganization(req, res) {
  const [[user]] = await safeOperation(
    () => db.query("select selectedOrganization from users where userId = ?", [req.session.user.id]),
    "Error while retrieving selected organization from database"
  )

  const selectedOrganization = user.selectedOrganization ? user.selectedOrganization : 0
  
  res.status(200).json({success: true, message: "Successfully retrieved selected organization from database", selectedOrganization})
}

export async function setSelectedOrganization(req, res) {
  const {organizationId} = req.body

  const [[organization]] = await safeOperation(
    () => db.query("select organizationId from organizations where organizationId = ?", [organizationId]),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})

  await safeOperation(
    () => db.query("update users set selectedOrganization = ? where userId = ?", [organizationId, req.session.user.id]),
    "Error while retrieving selected organization from database"
  )
  
  res.status(200).json({success: true, message: "Successfully set selected organization"})
}

export async function getUsers(req, res) {
  const {organizationId} = req.query
  checkReq(!organizationId)

  const [[organization]] = await safeOperation(
    () => db.query("select organizationId from organizations where organizationId = ?", [organizationId]),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  
  const [users] = await safeOperation(
    () => db.query(
      `select userId, username, email, userRole from organization_users
      join users on fk_UserId = userId
      where fk_OrganizationId = ?`,
      [organizationId]
    ),
    "Error while retrieving organization users from database"
  )

  res.status(200).json({success: true, message: "Successfully retrieved organization users from database", users})
}

export async function createOrganization(req, res) {
  const {name, description} = req.body
  checkReq(!name)

  const [result] = await safeOperation(
    () => db.query(
      "insert into organizations (name, description, joinUUID) values (?,?,?)", 
      [name, description || "", crypto.randomUUID()]),
    "Error while inserting organization into database"
  )

  await safeOperation(
    () => db.query(
      "insert into organization_users (userRole, fk_UserId, fk_OrganizationId) values (?,?,?)",
      ["owner", req.session.user.id, result.insertId]
    ),
    "Error while inserting organization owner"
  )

  res.status(201).json({success: true, message: "Successfully created organization"})
}

export async function deleteOrganization(req, res) {
  const {organizationId} = req.body
  checkReq(!organizationId)

  const [[organization]] = await safeOperation(
    () => db.query("select organizationId from organizations where organizationId = ?", [organizationId]),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  if (organizationUser.userRole !== "owner") return res.status(403).json({success: false, message: "Only the owner of an organization is allowed to delete it"})

  await safeOperation(
    () => db.query("delete from organizations where organizationId = ?", [organizationId]),
    "Error while deleting organization"
  )

  res.status(200).json({success: true, message: "Successfully deleted organization"})
}

export async function editOrganization(req, res) {
  const {organizationId, organizationName, organizationDescription} = req.body
  checkReq(!organizationId)

  const [[organization]] = await safeOperation(
    () => db.query("select organizationId from organizations where organizationId = ?", [organizationId]),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  if (organizationUser.userRole !== "owner") return res.status(403).json({success: false, message: "Only the owner of an organization is allowed to edit it"})

  await safeOperation(
    async () => {
      if (organizationName) await db.query("update organizations set name = ? where organizationId = ?", [organizationName, organizationId])
      if (organizationDescription) await db.query("update organizations set description = ? where organizationId = ?", [organizationDescription, organizationId])
    },
    "Error while updating the organization"
  )

  res.status(200).json({success: true, message: "Successfully edited organization"})
}

export async function toggleAdmin(req, res) {
  const {organizationId, userToChangeId} = req.body
  checkReq(!organizationId)

  const [[organization]] = await safeOperation(
    () => db.query("select organizationId from organizations where organizationId = ?", [organizationId]),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "Requesting user not in organization"})
  if (organizationUser.userRole !== "owner") return res.status(403).json({success: false, message: "Only the owner of an organization is allowed change user roles of members"})

  const [[userToChange]] = await safeOperation(
    () => db.query("select userRole from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [userToChangeId, organizationId]),
    "Error while retrieving the updating user from database"
  )

  if (!userToChange) return res.status(404).json({success: false, message: "Requesting user not in organization or doesn't exist"})
  if (userToChange.userRole === "owner") return res.status(403).json({success: false, message: "The owner of an organization must stay owner"})
  
  await safeOperation(
    () => db.query(
      "update organization_users set userRole = ? where fk_OrganizationId = ? and fk_UserId = ?", 
      [userToChange.userRole === "user" ? "admin" : "user", organizationId, userToChangeId]
    ),
    "Error while updating user role"
  )

  res.status(200).json({success: true, message: "Successfully toggled admin on user"})
}

export async function joinOrganization(req, res) {
  const {joinId} = req.body
  checkReq(!joinId)

  const [[organization]] = await safeOperation(
    () => db.query("select organizationId from organizations where joinUUID = ?", [joinId]),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organization.organizationId]),
    "Error while retrieving organization user from database"
  )

  if (organizationUser) return res.status(409).json({success: false, message: "User already in organization"})
  
  await safeOperation(
    () => db.query("insert into organization_users (userRole, fk_UserId, fk_OrganizationId) values (?,?,?)", ["user", req.session.user.id, organization.organizationId]),
    "Error while inserting organization user into database"
  )

  res.status(200).json({success: true, message: "Successfully joined organization"})
}

export async function leaveOrganization(req, res) {
  const {organizationId} = req.body
  checkReq(!organizationId)

  const [[organization]] = await safeOperation(
    () => db.query("select organizationId from organizations where organizationId = ?", [organizationId]),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  if (organizationUser.userRole === "owner") return res.status(403).json({success: false, message: "The owner of an organization can't leave it"})

  await safeOperation(
    () => db.query("delete from organization_users where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while deleting organization user from database"
  )

  res.status(200).json({success: true, message: "Successfully left organization"})
}