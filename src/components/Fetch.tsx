import { getMessages, deleteMessage, setMessages, editMessage } from "../Api";

export interface Message {
  mail_id: number;
  mail_code: string;
  content: string;
  incoming_or_outgoing: string;
  to_or_from: string;
  date: string;
  user_id: number;
}

export const fetchMessages = async (token: string, onDataFetched: (data: Message[]) => void, onError: (error: string) => void): Promise<void> => {
  try {
    const response = await getMessages(token);
    console.log("data :>> ", response);

    // Validasi struktur respons
    if (response && response.status && Array.isArray(response.data)) {
      const sortedData = response.data.sort((a: Message, b: Message) => a.mail_id - b.mail_id);
      onDataFetched(sortedData); // Memanggil callback dengan data yang diambil
    } else {
      console.error("Invalid response structure:", response);
      onError("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    onError("Failed to fetch messages");
  }
};

export const deleteMessages = async (
  token: string,
  messageId: number,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>, // Tipe untuk setMessages
  setError: React.Dispatch<React.SetStateAction<string | null>> // Tipe untuk setError
) => {
  try {
    await deleteMessage(token, messageId.toString()); // Panggil API untuk menghapus pesan
    // Perbarui state untuk menghapus pesan dari UI
    setMessages((prevMessages) => prevMessages.filter((message) => message.mail_id !== messageId));
    alert("Message deleted successfully");
  } catch (error) {
    setError("Failed to delete message");
  }
};

export const handleAddMessage = async (
  token: string,
  messageData: {
    mail_code: string;
    content: string;
    incoming_or_outgoing: string;
    to_or_from: string;
  },
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const response = await setMessages(token, messageData);
    console.log("Message created successfully:", response);
    alert("Message created successfully");
    setError(null);
  } catch (error) {
    setError("Failed to create message");
    console.error(error);
  }
};

export const handleEditMessage = async (
  token: string,
  messageData: {
    mail_id: number;
    mail_code: string;
    content: string;
    incoming_or_outgoing: string;
    to_or_from: string;
  },
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const response = await editMessage(token, messageData);
    console.log("Message edited successfully:", response);
    alert("Message created successfully"); // Panggil callback onSuccess jika berhasil
  } catch (error) {
    console.error("Failed to edit message:", error);
    setError("Failed to edit message"); // Panggil callback onError jika gagal
  }
};
