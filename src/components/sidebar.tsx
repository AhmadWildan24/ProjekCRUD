import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Layout,
  Mail,
  LayoutDashboard,
  Settings,
  FileText,
  Info,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => (
  <div className="w-64 bg-white border-r h-screen p-6">{children}</div>
);

type SidebarItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  isDropdown?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  children,
  isDropdown,
  isOpen,
  onClick,
}) => (
  <Button
    variant="ghost"
    className="w-full justify-start mb-1 hover:bg-gray-100"
    onClick={onClick}
  >
    <Icon className="mr-2 h-4 w-4" />
    <span className="flex-1 text-sm">{children}</span>
    {isDropdown &&
      (isOpen ? (
        <ChevronDown className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      ))}
  </Button>
);

const DropdownItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="ml-6 mb-1">
    <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
      <span className="text-sm">{children}</span>
    </Button>
  </div>
);

const SideBar = () => {
  const [isSuratOpen, setIsSuratOpen] = useState(false);

  const toggleSuratDropdown = () => {
    setIsSuratOpen(!isSuratOpen);
  };

  return (
    <Sidebar>
      <div className="flex items-center gap-2 mb-8">
        <Layout className="h-6 w-6 text-blue-600" />
        <h1 className="font-semibold text-lg">E-ARSIP</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <nav className="space-y-1">
          <Link to="/home">
            <SidebarItem icon={LayoutDashboard}>Dashboard</SidebarItem>
          </Link>

          <SidebarItem
            icon={Mail}
            isDropdown={true}
            isOpen={isSuratOpen}
            onClick={toggleSuratDropdown}
          >
            Surat
          </SidebarItem>

          {isSuratOpen && (
            <>
              <Link to="/pesan?status=INCOMING">
                <DropdownItem>Surat Masuk</DropdownItem>
              </Link>
              <Link to="/pesan?status=OUTGOING">
                <DropdownItem>Surat Keluar</DropdownItem>
              </Link>
            </>
          )}
        </nav>
      </ScrollArea>
    </Sidebar>
  );
};

export default SideBar;
