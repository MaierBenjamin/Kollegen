import request from '../request.js'

export async function getGroups() {
  return request("get", "/")
}

export async function createGroup(data) {
  return request("post", "/create", data)
}

export async function deleteGroup() {
  return request("delete", "/delete")
}

export async function editGroup(data) {
  return request("patch", "/edit", data)
}

export async function joinGroup(data) {
  return request("post", "/join", data)
}

export async function leaveGroup() {
  return request("delete", "/leave")
}

export async function sendChannelMessage(data) {
  return request("post", "/channel/send-message", data)
}

export async function createChannel(data) {
  return request("post", "/channel/create", data)
}

export async function deleteChannel() {
  return request("delete", "/channel/delete")
}

export async function editChannel(data) {
  return request("patch", "/channel/edit", data)
}

export async function uploadChannelFile(formData) {
  return request("post", "/channel/upload", formData)
}

export async function getChannelFiles() {
  return request("get", "/channel/files")
}

export async function downloadChannelFile(params) {
  return request("get", "/channel/download", params)
}
