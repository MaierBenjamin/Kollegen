import request from "../request";

export async function createChat() {
  return request("post", "/create")
}

export async function sendMessage() {
  return request("post", "/send")
}

export async function getChat() {
  return request("get", "/single")
}

export async function getAllChats() {
  return request("get", "/")
}
