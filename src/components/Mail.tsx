import { useEffect, useState } from "react";
import { fetchMessages, deleteMessages } from "./Fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { PencilOff, Trash2Icon } from "lucide-react";
import SideBar from "./sidebar";
import PopUp from "./PopUp";
import PopUpEdit from "./PopUpEdit";

interface Message {
  mail_id: number;
  mail_code: string;
  content: string;
  incoming_or_outgoing: string;
  to_or_from: string;
  date: string;
  user_id: number;
}

const Pesan: React.FC<{ token: string }> = ({ token }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false); // Kontrol visibilitas PopUpEdit
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null); // Pesan yang dipilih untuk diedit

  const getMessages = () => {
    fetchMessages(
      token,
      (data) => setMessages(data),
      (errorMessage) => setError(errorMessage)
    );
  };

  useEffect(() => {
    getMessages();
  }, [token]);

  // Fungsi untuk menangani klik tombol edit
  const handleEditClick = (message: Message) => {
    setSelectedMessage(message); // Set pesan yang akan diedit
    setIsEditPopUpOpen(true); // Buka PopUpEdit
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />
      <main className="flex-1 p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Surat Masuk Hari Ini</CardTitle>
            <PopUp token={token} onFetchMessages={getMessages} />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Surat</TableHead>
                  <TableHead className="w-[100px]">Konten</TableHead>
                  <TableHead>Status Surat</TableHead>
                  <TableHead>Asal/Tujuan</TableHead>
                  <TableHead>Tanggal/Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.mail_code}>
                    <TableCell>{message.mail_code}</TableCell>
                    <TableCell className="font-medium">{message.content}</TableCell>
                    <TableCell>{message.incoming_or_outgoing}</TableCell>
                    <TableCell>{message.to_or_from}</TableCell>
                    <TableCell>{new Date(message.date).toLocaleString()}</TableCell>
                    <TableCell style={{ textAlign: "center" }} className="flex justify-center">
                      {/* Tombol Edit */}
                      <button onClick={() => handleEditClick(message)} className="mr-2 p-2 hover:bg-gray-200 rounded-full" aria-label="Edit">
                        <PencilOff className="h-5 w-5 text-blue-500" />
                      </button>

                      {/* Tombol Hapus */}
                      <button onClick={() => deleteMessages(token, message.mail_id, setMessages, setError)} className="p-2 hover:bg-gray-200 rounded-full ml-2" aria-label="Delete">
                        <Trash2Icon className="h-5 w-5 text-red-500" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Tampilkan PopUpEdit hanya saat isEditPopUpOpen bernilai true */}
      {isEditPopUpOpen && selectedMessage && <PopUpEdit token={token} onFetchMessages={getMessages} initialMessageData={selectedMessage} />}
    </div>
  );
};

export default Pesan;
