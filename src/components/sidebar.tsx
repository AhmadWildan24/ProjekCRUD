import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout, Mail, LayoutDashboard, Settings, FileText, Info, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => <div className="w-64 bg-white border-r h-screen p-6">{children}</div>;

type SidebarItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  hasChevron?: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, children, hasChevron }) => (
  <Button variant="ghost" className="w-full justify-start mb-1 hover:bg-gray-100">
    <Icon className="mr-2 h-4 w-4" />
    <span className="flex-1 text-sm">{children}</span>
    {hasChevron && <ChevronRight className="h-4 w-4" />}
  </Button>
);

const SideBar = () => {
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
          <div className="mt-6 mb-2">
            <p className="text-xs font-semibold text-gray-400 px-3">DATA MASTER</p>
          </div>
          <SidebarItem icon={Mail} hasChevron>
            Surat
          </SidebarItem>
          <SidebarItem icon={Settings} hasChevron>
            Pengaturan
          </SidebarItem>
          <SidebarItem icon={FileText} hasChevron>
            Laporan
          </SidebarItem>

          <div className="mt-6 mb-2">
            <p className="text-xs font-semibold text-gray-400 px-3">LAINNYA</p>
          </div>
          <SidebarItem icon={Info}>Tentang Sekolah</SidebarItem>
        </nav>
      </ScrollArea>
    </Sidebar>
  );
};

export default SideBar;
