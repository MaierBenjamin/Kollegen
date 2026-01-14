import request from '../request.js'

export async function getGroups(organizationId) {
  return request("get", "/groups", { params: { organizationId }})
}

export async function getGroup(groupId) {
  return request("get", "/groups/single", { params: { groupId }})
}

export async function createGroup(organizationId, groupName) {
  return request("post", "/groups/create", { data: { organizationId, groupName }})
}

export async function deleteGroup(groupId) {
  return request("delete", "/groups/delete", { data: { groupId }})
}

export async function editGroup(groupId, groupName) {
  return request("patch", "/groups/edit", { data: { groupId, groupName }})
}

export async function sendChannelMessage(channelId, message) {
  return request("post", "/groups/channel/send-message", { data: { channelId, message }})
}

export async function getChannelMessages(channelId) {
  return request("post", "/groups/channel/send-message", { params: { channelId, message }})
}

export async function createChannel(groupId, channelName) {
  return request("post", "/groups/channel/create", { data: { groupId, channelName }})
}

export async function deleteChannel(channelId) {
  return request("delete", "/groups/channel/delete", { data: { channelId }})
}


// export async function uploadChannelFile(formData) {
//   return request("post", "/channel/upload", formData)
// }

// export async function getChannelFiles() {
//   return request("get", "/channel/files")
// }

// export async function downloadChannelFile(params) {
//   return request("get", "/channel/download", params)
// }
