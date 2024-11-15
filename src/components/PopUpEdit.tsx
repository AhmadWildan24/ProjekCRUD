import * as React from "react";
import { useState, useEffect } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { handleEditMessage } from "./Fetch";

const Status = [
  { value: "INCOMING", label: "Surat Masuk" },
  { value: "OUTGOING", label: "Surat Keluar" },
];

interface PopUpProps {
  token: string;
  onFetchMessages: () => void; // Callback untuk memperbarui data setelah berhasil
  initialMessageData?: {
    // Data awal untuk edit (jika ada)
    mail_id: number;
    mail_code: string;
    content: string;
    incoming_or_outgoing: string;
    to_or_from: string;
  };
}

const PopUpEdit: React.FC<PopUpProps> = ({ token, onFetchMessages, initialMessageData }) => {
  const [isOpen, setIsOpen] = useState(false); // Kontrol dialog
  const [mailCode, setMailCode] = useState("");
  const [content, setContent] = useState("");
  const [incomingOrOutgoing, setIncomingOrOutgoing] = useState("INCOMING");
  const [toOrFrom, setToOrFrom] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Mengisi ulang form ketika initialMessageData berubah
  useEffect(() => {
    if (initialMessageData) {
      setMailCode(initialMessageData.mail_code || "");
      setContent(initialMessageData.content || "");
      setIncomingOrOutgoing(initialMessageData.incoming_or_outgoing || "INCOMING");
      setToOrFrom(initialMessageData.to_or_from || "");
      setIsOpen(true); // Membuka dialog ketika data ada
    }
  }, [initialMessageData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageData = {
      mail_id: initialMessageData?.mail_id as number, // Jika ada, gunakan untuk edit
      mail_code: mailCode,
      content: content,
      incoming_or_outgoing: incomingOrOutgoing,
      to_or_from: toOrFrom,
    };

    // Lakukan edit
    if (initialMessageData) {
      try {
        await handleEditMessage(token, messageData, setError);
        setIsOpen(false); // Tutup dialog setelah pesan berhasil diedit
        onFetchMessages(); // Perbarui daftar pesan
      } catch (error) {
        console.error("Error editing message:", error);
      }
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{initialMessageData ? "Edit Pesan" : "Tambah Pesan"}</DialogTitle>
              <DialogDescription>Silahkan {initialMessageData ? "edit" : "tambah"} pesan dengan mengisi formulir berikut</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mailCode" className="text-right">
                  Kode Pesan
                </Label>
                <Input id="mailCode" type="text" placeholder="Mail Code" value={mailCode} onChange={(e) => setMailCode(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Subjek
                </Label>
                <Input id="content" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select id="status" value={incomingOrOutgoing} onChange={(e) => setIncomingOrOutgoing(e.target.value)} className="col-span-3 p-2 border border-gray-300 rounded" required>
                  {Status.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="toOrFrom" className="text-right">
                  Dari/Kepada
                </Label>
                <Input id="toOrFrom" placeholder="From/To" value={toOrFrom} onChange={(e) => setToOrFrom(e.target.value)} className="col-span-3" required />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <DialogFooter>
              <Button id="submit" type="submit">
                {initialMessageData ? "Edit Pesan" : "Tambah Pesan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUpEdit;
