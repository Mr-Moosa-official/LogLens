"use client";

import { ServerCrash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";

export function LogLayout({
  sidebarContent,
  children,
  headerContent,
}: {
  sidebarContent: React.ReactNode;
  children: React.ReactNode;
  headerContent: React.ReactNode;
}) {
  return (
    <>
      <Sidebar>
        <div className="flex h-full flex-col">
          <header className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <ServerCrash className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold font-headline">LogLens</h1>
            </div>
          </header>
          <ScrollArea className="flex-1">
            <div className="p-4">{sidebarContent}</div>
          </ScrollArea>
        </div>
      </Sidebar>
      <SidebarInset className="flex flex-col overflow-hidden max-h-screen">
        <header className="flex items-center gap-4 p-4 border-b shrink-0">
          <SidebarTrigger className="md:hidden" />
          {headerContent}
        </header>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}
