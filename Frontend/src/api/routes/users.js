import request from '../request.js'

export async function register(username, email, password) {
  return request("post", "/register", { data: { username, email, password }})
}

export async function login(email, password) {
  return request("post", "/login", { data: { email, password }})
}

export async function logout() {
  return request("post", "/logout")
}

export async function checkLogin() {
  return request("get", "/check-login")
}

export async function getUserdata() {
  return request("get", "/data")
}

export async function editUserdata(username, email) {
  return request("patch", "/edit", { data: { username, email }})
}

export async function deleteUser() {
  return request("delete", "/delete")
}