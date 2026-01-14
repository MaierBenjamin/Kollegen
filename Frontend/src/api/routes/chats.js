import request from "../request";

export async function sendMessage(receivingUserId, organizationId, message) {
  return request("post", "/chats/send", { data: { receivingUserId, organizationId, message }})
}

export async function getChat(chatPartnerId, organizationId) {
  return request("get", "/chats/single", { params: { chatPartnerId, organizationId }})
}

export async function getAllChats(organizationId) {
  return request("get", "/chats", { params: { organizationId }})
}
