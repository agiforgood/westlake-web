"use client";

const DEV_API_BASE = "http://localhost:3000";
const PRO_API_BASE = "https://api.westlakeaiforgood.com";
const API_BASE =
  process.env.NODE_ENV === "development" ? DEV_API_BASE : PRO_API_BASE;

export async function getChatSessions(token: string) {
  const res = await fetch(`${API_BASE}/api/chat/list`, {
    credentials: "include",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function getMessages(token: string, userId: string) {
  const res = await fetch(`${API_BASE}/api/chat/messages/${userId}`, {
    credentials: "include",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function sendMessage(
  token: string,
  receiverId: string,
  content: string
) {
  const res = await fetch(`${API_BASE}/api/chat/send`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      receiverId,
      content,
    }),
  });
  return res.json();
}
