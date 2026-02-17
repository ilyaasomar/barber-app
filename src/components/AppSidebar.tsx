import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocation, Link } from "react-router";
import {
  Home,
  Users,
  BarChart2,
  ShoppingCart,
  Box,
  MessageCircle,
  Settings,
  Bell,
  FileText,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { styles } from "@/styles";

const iconMap = {
  home: Home,
  users: Users,
  chart: BarChart2,
  "shopping-cart": ShoppingCart,
  box: Box,
  "message-circle": MessageCircle,
  settings: Settings,
  bell: Bell,
  "file-text": FileText,
  "help-circle": HelpCircle,
};

export const sidebarLinks = [
  { name: "Dashboard", icon: "home", path: "/dashboard" },
  { name: "Users", icon: "users", path: "/users" },
  { name: "Analytics", icon: "chart", path: "/analytics" },
  { name: "Orders", icon: "shopping-cart", path: "/orders" },
  { name: "Products", icon: "box", path: "/products" },
  { name: "Messages", icon: "message-circle", path: "/messages" },
  { name: "Settings", icon: "settings", path: "/settings" },
  { name: "Notifications", icon: "bell", path: "/notifications" },
  { name: "Reports", icon: "file-text", path: "/reports" },
  { name: "Support", icon: "help-circle", path: "/support" },
];
const AppSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar(); // ✅ gives you "expanded" | "collapsed" | "hidden"
  const isCollapsed = state === "collapsed";
  console.log(isCollapsed);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-3 group-data-[collapsible=icon]:p-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 overflow-hidden"
        >
          {/* Icon mark — swap this svg for your real logo later */}
          <div
            className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${styles.primaryBgColor}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-5 text-white"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>

          {/* Text — hidden when sidebar collapses to icon mode */}
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              IO Inc
            </span>
            <span className="text-[11px] text-muted-foreground">
              Admin Dashboard
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-4 px-2">
        <SidebarMenu className="flex gap-2">
          {sidebarLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            const isActive = location.pathname === link.path;
            return (
              <SidebarMenuItem key={link.path}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    isActive
                      ? `${styles.primaryBgColor} text-white hover:${styles.primaryBgColor} hover:text-white focus:${styles.primaryBgColor} focus:text-white active:${styles.primaryBgColor} active:text-white data-[state=open]:${styles.primaryBgColor} data-[state=open]:text-white`
                      : `hover:${styles.accentBgColor}`,
                  )}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "transition-all",
                      isActive
                        ? `${styles.primaryBgColor} text-white font-sans font-medium hover:${styles.primaryBgColor} hover:text-white focus:${styles.primaryBgColor} focus:text-white active:${styles.primaryBgColor} active:text-white`
                        : `font-sans font-medium text-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-700`,
                    )}
                  >
                    <Icon className="size-4 shrink-0 transition-all" />
                    <span className="font-sans text-[14px]">{link.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="font-sans text-[16px]">
                  <Settings /> Settings
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <Link to={"/profile"}>
                  <DropdownMenuItem>
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
