import { db } from '../database/db.js'
import { safeOperation, safeOperations, checkReq } from '../error-handling.js'

export async function getGroups(req, res) {
  const {organizationId} = req.query
  checkReq(!organizationId)

  const [[organization]] = await safeOperation(
    () => db.query("select organizationId from Organizations where organizationId = ?", [organizationId]),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from OrganizationUsers where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})

  const [groups] = await safeOperation(
    () => db.query("select groupId, name from Groups where fk_OrganizationId = ?", [organizationId]),
    "Error while retrieving groups from database"
  )

  res.status(200).json({success: true, message: "Successfully retrieved groups from database", groups})
}

export async function getGroup(req, res) {
  const {groupId} = req.query
  checkReq(!groupId)

  const [[group]] = await safeOperation(
    () => db.query("select name, fk_OrganizationId from Groups where groupId = ?", [groupId]),
    "Error while retrieving group from database"
  )
  
  if (!group) return res.status(404).json({success: false, message: "Group not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from OrganizationUsers where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, group.fk_OrganizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})

  const [channels] = await safeOperation(
    () => db.query("select groupChannelId as channelId, name from GroupChannels where fk_GroupId = ?", [groupId]),
    "Error while retrieving channels from database"
  )

  const formattedGroup = {
    groupId: groupId,
    name: group.name,
    channels
  }

  res.status(200).json({success: true, message: "Successfully retrieved group from database", group: formattedGroup})
}

export async function createGroup(req, res) {
  const {organizationId, groupName} = req.body
  checkReq(!organizationId || !groupName)

  const [[organization]] = await safeOperation(
    () => db.query("select organizationId from Organizations where organizationId = ?", [organizationId]),
    "Error while retrieving organization from database"
  )
  
  if (!organization) return res.status(404).json({success: false, message: "Organization not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from OrganizationUsers where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, organizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  if (!["admin","owner"].includes(organizationUser.userRole)) return res.status(403).json({success: false, message: "Only admins and the owner of an organization can create groups"})

  await safeOperation(
    () => db.query("insert into Groups (name, fk_OrganizationId) values (?,?)", [groupName, organizationId]),
    "Error while inserting new group"
  )

  res.status(201).json({success: true, message: "Successfully created new group"})
}

export async function deleteGroup(req, res) {
  const {groupId} = req.body
  checkReq(!groupId)

  const [[group]] = await safeOperation(
    () => db.query("select fk_OrganizationId from Groups where groupId = ?", [groupId]),
    "Error while retrieving group from database"
  )
  
  if (!group) return res.status(404).json({success: false, message: "Group not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from OrganizationUsers where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, group.fk_OrganizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  if (!["admin","owner"].includes(organizationUser.userRole)) return res.status(403).json({success: false, message: "Only admins and the owner of an organization can delete groups"})

  await safeOperation(
    () => db.query("delete from Groups where groupId = ?", [groupId]),
    "Error while deleting group"
  )

  res.status(200).json({success: true, message: "Successfully deleted group"})
}

export async function editGroup(req, res) {
  const {groupId, groupName} = req.body
  checkReq(!groupId || !groupName)

  const [[group]] = await safeOperation(
    () => db.query("select fk_OrganizationId from Groups where groupId = ?", [groupId]),
    "Error while retrieving group from database"
  )
  
  if (!group) return res.status(404).json({success: false, message: "Group not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from OrganizationUsers where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, group.fk_OrganizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  if (!["admin","owner"].includes(organizationUser.userRole)) return res.status(403).json({success: false, message: "Only admins and the owner of an organization can edit groups"})

  await safeOperation(
    () => db.query("update Groups set name = ? where groupId = ?", [groupName, groupId]),
    "Error while updating group"
  )

  res.status(200).json({success: true, message: "Successfully edited group"})
}

export async function getChannelMessages(req, res) {
  const {channelId} = req.query
  checkReq(!channelId)

  const [[channel]] = await safeOperation(
    () => db.query(
      `select fk_OrganizationId from GroupChannels 
      join Groups on groupId = fk_GroupId
      where groupChannelId = ?`, 
      [channelId]
    ),
    "Error while retrieving group from database"
  )
  
  if (!channel) return res.status(404).json({success: false, message: "Channel not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from OrganizationUsers where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, channel.fk_OrganizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})

  const [messages] = await safeOperation(
    () => db.query("select content as message, fk_UserId as userId from ChannelMessages where fk_GroupChannelId = ?", [channelId]),
    "Error while updating group"
  )

  res.status(200).json({success: true, message: "Successfully edited group", messages})
}

export async function sendChannelMessage(req, res) {
  const {channelId, message} = req.body
  checkReq(!channelId || !message)

  const [[channel]] = await safeOperation(
    () => db.query(
      `select fk_OrganizationId from GroupChannels 
      join Groups on groupId = fk_GroupId
      where groupChannelId = ?`, 
      [channelId]
    ),
    "Error while retrieving group from database"
  )
  
  if (!channel) return res.status(404).json({success: false, message: "Channel not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from OrganizationUsers where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, channel.fk_OrganizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})

  await safeOperation(
    () => db.query("insert into ChannelMessages (content, fk_UserId, fk_GroupChannelId) values (?,?,?)", [message, req.session.user.id, channelId]),
    "Error while inserting message into database"
  )

  res.status(200).json({success: true, message: "Successfully sent message in channel"})
}

export async function createChannel(req, res) {
  const {groupId, channelName} = req.body
  checkReq(!groupId || !channelName)

  const [[group]] = await safeOperation(
    () => db.query("select fk_OrganizationId from Groups where groupId = ?", [groupId]),
    "Error while retrieving group from database"
  )
  
  if (!group) return res.status(404).json({success: false, message: "Group not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from OrganizationUsers where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, group.fk_OrganizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  if (!["admin","owner"].includes(organizationUser.userRole)) return res.status(403).json({success: false, message: "Only admins and the owner of an organization can add channels to groups"})

  await safeOperation(
    () => db.query("insert into GroupChannels (name, fk_GroupId) values (?,?)", [channelName, groupId]),
    "Error while inserting new channel into database"
  )

  res.status(200).json({success: true, message: "Successfully created a new channel"})
}

export async function deleteChannel(req, res) {
  const {channelId} = req.body
  checkReq(!channelId)

  const [[channel]] = await safeOperation(
    () => db.query(
      `select fk_OrganizationId from GroupChannels 
      join Groups on groupId = fk_GroupId
      where groupChannelId = ?`, 
      [channelId]
    ),
    "Error while retrieving group from database"
  )
  
  if (!channel) return res.status(404).json({success: false, message: "Channel not found"})

  const [[organizationUser]] = await safeOperation(
    () => db.query("select userRole from OrganizationUsers where fk_UserId = ? and fk_OrganizationId = ?", [req.session.user.id, channel.fk_OrganizationId]),
    "Error while retrieving organization user from database"
  )

  if (!organizationUser) return res.status(404).json({success: false, message: "User not in organization"})
  if (!["admin","owner"].includes(organizationUser.userRole)) return res.status(403).json({success: false, message: "Only admins and the owner of an organization can delete channels"})

  await safeOperation(
    () => db.query("delete from GroupChannels where groupChannelId = ?", [channelId]),
    "Error while deleting channel from database"
  )

  res.status(200).json({success: true, message: "Successfully deleted channel"})
}

export async function uploadChannelFile(req, res) {

}

export async function showChannelFiles(req, res) {

}

export async function downloadChannelFile(req, res) {

}
