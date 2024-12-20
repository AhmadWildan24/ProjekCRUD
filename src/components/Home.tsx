import React, { useEffect, useState } from "react";
import { fetchMessages } from "./Fetch";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Mail, FileText, Bell, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SideBar from "./sidebar";

interface Message {
  mail_id: number;
  mail_code: string;
  content: string;
  incoming_or_outgoing: string;
  to_or_from: string;
  date: string;
  user_id: number;
}

type StatsCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string | number;
};

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value }) => (
  <Card>
    <CardContent className="flex items-center p-6">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const MessageList: React.FC<{ token: string }> = ({ token }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Panggil fetchMessages dan tangani data serta kesalahan
    fetchMessages(
      token,
      (data) => setMessages(data),
      (errorMessage) => setError(errorMessage)
    );
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter Surat Masuk dan Keluar
  const incomingMessages = messages.filter(
    (message) => message.incoming_or_outgoing === "INCOMING"
  );
  const outgoingMessages = messages.filter(
    (message) => message.incoming_or_outgoing === "OUTGOING"
  );

  // Hitung statistik
  const totalIncoming = incomingMessages.length;
  const totalOutgoing = outgoingMessages.length;
  const totalDocuments = messages.length;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-500">admin@e-arsip.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={Mail}
            label="TOTAL SURAT MASUK"
            value={totalIncoming}
          />
          <StatsCard
            icon={Mail}
            label="TOTAL SURAT KELUAR"
            value={totalOutgoing}
          />
          <StatsCard
            icon={FileText}
            label="TOTAL DOKUMEN"
            value={totalDocuments}
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Tabel Surat Masuk */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Surat Masuk</CardTitle>
              <Link to="/pesan?status=INCOMING">
                <Button variant="ghost" size="sm">
                  Lihat Semua
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Konten</TableHead>
                    <TableHead>Asal Surat</TableHead>
                    <TableHead>Tanggal/Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomingMessages.map((message) => (
                    <TableRow key={message.mail_code}>
                      <TableCell className="font-medium">
                        {message.content}
                      </TableCell>
                      <TableCell>{message.to_or_from}</TableCell>
                      <TableCell>
                        {new Date(message.date).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Tabel Surat Keluar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                Surat Keluar
              </CardTitle>

              <Link to="/pesan?status=OUTGOING">
                <Button variant="ghost" size="sm">
                  Lihat Semua
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">No</TableHead>
                    <TableHead>Penerima</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outgoingMessages.map((message, index) => (
                    <TableRow key={message.mail_code}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {message.to_or_from}
                      </TableCell>
                      <TableCell>
                        {new Date(message.date).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MessageList;
