import * as React from "react";
import { cn } from "@/lib/utils.js";

const Sidebar = React.forwardRef(({ className, ...props }, ref) => (
  <aside ref={ref} className={cn("flex h-screen w-sidebar flex-col border-r bg-sidebar", className)} {...props} />
));
Sidebar.displayName = "Sidebar";

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-1 flex-col gap-4 overflow-auto p-4", className)} {...props} />
));
SidebarContent.displayName = "SidebarContent";

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2 px-4 py-2", className)} {...props} />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2 border-t px-4 py-4", className)} {...props} />
));
SidebarFooter.displayName = "SidebarFooter";

export { Sidebar, SidebarContent, SidebarHeader, SidebarFooter };
