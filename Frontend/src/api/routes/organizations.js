import request from "../request";

export async function getUsers(organizationId) {
  return request("get", "/organizations/users", { params: { organizationId }})
}

export async function getOrganization(organizationId) {
  return request("get", "/organizations/single", { params: { organizationId }})
}

export async function createOrganization(name, description) {
  return request("post", "/organizations/create", { data: { name, description }})
}

export async function deleteOrganization(organizationId) {
  return request("delete", "/organizations/delete", { data: { organizationId }})
}

export async function editOrganization(organizationId, organizationDescription) {
  return request("patch", "/organizations/edit", { data: { organizationId, organizationDescription }})
}

export async function toggleAdmin(organizationId, userToChangeId) {
  return request("patch", "/organizations/toggle-admin", { data: { organizationId, userToChangeId }})
}

export async function joinOrganization(joinId) {
  return request("post", "/organizations/join", { data: { joinId }})
}

export async function leaveOrganization(organizationId) {
  return request("delete", "/organizations/leave", { data: { organizationId }})
}
