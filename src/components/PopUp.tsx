import * as React from "react";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { handleAddMessage } from "./Fetch";

// Data Status untuk Dropdown
const Status = [
  { value: "INCOMING", label: "Surat Masuk" },
  { value: "OUTGOING", label: "Surat Keluar" },
];

interface PopUpProps {
  token: string;
  onFetchMessages: () => void; // Tambahkan props untuk memanggil fetchMessages
}

const PopUp: React.FC<PopUpProps> = ({ token, onFetchMessages = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false); // Kontrol dialog
  const [mailCode, setMailCode] = useState("");
  const [content, setContent] = useState("");
  const [incomingOrOutgoing, setIncomingOrOutgoing] = useState("INCOMING"); // Status default
  const [toOrFrom, setToOrFrom] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageData = {
      mail_code: mailCode,
      content: content,
      incoming_or_outgoing: incomingOrOutgoing,
      to_or_from: toOrFrom,
    };

    // Panggil handleAddMessage dengan token, data pesan, dan setError
    handleAddMessage(token, messageData, setError).then(() => {
      // Reset state setelah pesan berhasil ditambahkan
      console.log("Message added, fetching messages...");
      setMailCode("");
      setContent("");
      setIncomingOrOutgoing("INCOMING");
      setToOrFrom("");
      setIsOpen(false); // Tutup dialog setelah pesan ditambahkan
      onFetchMessages();
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Tambah Pesan
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Bungkus dengan form */}
            <DialogHeader>
              <DialogTitle>Tambah Pesan</DialogTitle>
              <DialogDescription>Silahkan tambah pesan dengan mengisi formulir berikut</DialogDescription>
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
                Tambah Pesan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUp;
