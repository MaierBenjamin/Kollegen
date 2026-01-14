import request from '../request.js'

export async function register(username, email, password) {
  return request("post", "/users/register", { data: { username, email, password }})
}

export async function login(emailUsername, password) {
  if (/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(emailUsername)) {
    return request("post", "/users/login", { data: { email: emailUsername, password }})
  } else {
    return request("post", "/users/login", { data: { username: emailUsername, password }})
  }
}

export async function logout() {
  return request("post", "/users/logout")
}

export async function checkLogin() {
  return request("get", "/users/check-login")
}

export async function getUserdata() {
  return request("get", "/users/data")
}

export async function editUserdata(username, email) {
  return request("patch", "/users/edit", { data: { username, email }})
}

export async function deleteUser() {
  return request("delete", "/users/delete")
}