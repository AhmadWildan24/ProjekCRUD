// src/api/api.ts
const BASE_URL = "https://d7fe-66-96-225-157.ngrok-free.app"; // Ganti dengan URL Ngrok Anda

export const login = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  return data.token;
};

export const setMessages = async (
  token: string,
  messageData: {
    mail_code: string;
    content: string;
    incoming_or_outgoing: string;
    to_or_from: string;
  }
) => {
  console.log("Token :>> ", token);
  console.log("Message Data :>> ", messageData);

  const response = await fetch(`${BASE_URL}/v1/mails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(messageData),
  });

  if (!response.ok) {
    throw new Error("Failed to create message");
  }

  console.log("Response :>> ", response);
  return await response.json();
};

export const getMessages = async (token: string) => {
  console.log("token :>> ", token);
  const response = await fetch(`${BASE_URL}/v1/getmails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("response :>> ", response);
  return await response.json();
};

export const deleteMessage = async (token: string, messageId: string) => {
  console.log("Deleting message with ID:", messageId);

  const response = await fetch(`${BASE_URL}/v1/mails/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mail_id: messageId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete message");
  }

  console.log("Message deleted successfully:", response);
  return await response.json();
};

export const editMessage = async (
  token: string,
  messageData: {
    mail_id: number;
    mail_code: string;
    content: string;
    incoming_or_outgoing: string;
    to_or_from: string;
  }
) => {
  console.log("token :>> ", token);

  try {
    const response = await fetch(`${BASE_URL}/v1/mails/edit`, {
      method: "POST", // Menggunakan POST untuk update jika API memerlukan ini
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error(`Failed to edit message: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Edit response :>> ", data);
    return data;
  } catch (error) {
    console.error("Error editing message:", error);
    throw error;
  }
};
