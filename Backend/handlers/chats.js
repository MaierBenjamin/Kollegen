import { db } from '../database/db.js'
import { safeOperation, safeOperations, checkReq } from '../error-handling.js'

export async function sendMessage(req, res) {
	const {receivingUserId, organizationId, message} = req.body
  checkReq(!receivingUserId || !organizationId || !message)

  if (receivingUserId === req.session.user.id) return res.status(400).json({success: false, message: "Cannot message self"})

  const organizationUserQuery = "select organizationUserId from organization_users where fk_UserId = ? and fk_OrganizationId = ?"

  const [[sendingOrganizationUser], [receivingOrganizationUser]] = await safeOperations([
    () => db.query(organizationUserQuery, [req.session.user.id, organizationId]),
    () => db.query(organizationUserQuery, [receivingUserId, organizationId]),
  ], "Error while checking user's organization")

  if (!sendingOrganizationUser) return res.status(403).json({success: false, message: "Sending user is not in the provided organization"})
  if (!receivingOrganizationUser) return res.status(403).json({success: false, message: "Receiving user is not in the provided organization"})

  await safeOperation(
    () => db.query(
      "insert into direct_messages (content, fk_OrganizationId, fk_SendingUserId, fk_ReceivingUserId) values (?,?,?,?)",
      [message, organizationId, req.session.user.id, receivingUserId]
    ),
    "Error while inserting message into the database"
  )

  res.status(200).json({success: true, message: "Successfully sent message"})
}

export async function getChat(req, res) {
  const {chatPartnerId, organizationId} = req.query
  checkReq(!chatPartnerId || !organizationId)

  const [chatMessages] = await safeOperation(
    () => db.query(`
      select directMessageId as messageId, content as message, fk_SendingUserId as sendingUser from direct_messages 
      where fk_SendingUserId in (?,?) and fk_ReceivingUserId in (?,?) and fk_OrganizationId = ?
      order by directMessageId asc`,
      [req.session.user.id, chatPartnerId, req.session.user.id, chatPartnerId, organizationId]
    ),
    "Error while retrieving chat messages from database"
  )

  res.status(200).json({success: true, message: "Successfully retrieved chat from database", messages: chatMessages})
}

export async function getAllChats(req, res) {
  const {organizationId} = req.query
  checkReq(!organizationId)

  const [chats] = await safeOperation(
    () => db.query(
      "select fk_SendingUserId, fk_ReceivingUserId from direct_messages where (fk_SendingUserId = ? or fk_ReceivingUserId = ?) and fk_OrganizationId = ?",
      [req.session.user.id, req.session.user.id, organizationId]
    )
  )

  const chatPartnersWithDuplicates = chats.map(chat => chat.fk_SendingUserId === req.session.user.id ? chat.fk_ReceivingUserId : chat.fk_SendingUserId)
  const chatPartnerIds = []
  chatPartnersWithDuplicates.forEach(chatPartner => !chatPartnerIds.includes(chatPartner) && chatPartnerIds.push(chatPartner))

  const chatPartnersPlaceholders = chatPartnerIds.map(() => "?").join(",")
  const chatPartnersQuery = `select userId, username from users where userId = (${chatPartnersPlaceholders})`

  const [chatPartners] = await safeOperation(
    () => db.query(chatPartnersQuery, chatPartnerIds),
    "Error while retrieving chatpartners"
  )

  res.status(200).json({success: true, message: "Successfully retrived all chats", chats: chatPartners})
}