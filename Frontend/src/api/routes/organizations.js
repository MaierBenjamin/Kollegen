import request from "../request";

export async function createOrganization(data) {
  return request("post", "/create", data)
}

export async function deleteOrganization() {
  return request("delete", "/delete")
}

export async function editOrganization(data) {
  return request("patch", "/edit", data)
}

export async function changeUserRole(data) {
  return request("patch", "/change-userrole", data)
}

export async function joinOrganization(data) {
  return request("post", "/join", data)
}

export async function leaveOrganization() {
  return request("delete", "/leave")
}
