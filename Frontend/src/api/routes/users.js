import request from '../request.js'

export async function register() {
  return request("post", "/register")
}

export async function login() {
  return request("post", "/login")
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

export async function editUserdata() {
  return request("patch", "/edit")
}

export async function deleteUser() {
  return request("delete", "/delete")
}