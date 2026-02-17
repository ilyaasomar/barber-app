import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarTrigger } from "./ui/sidebar";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <div className="w-full shrink-0 border-b bg-background">
      <div className="px-4 h-14 flex items-center justify-between">
        {/* LEFT SIDE */}
        <SidebarTrigger />
        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 mr-5">
          <div className="ml-auto flex-1 sm:flex-initial">
            <p className="text-md font-semibold text-gray-600 dark:text-white"></p>
          </div>
          {/* THEME  */}
          <ThemeToggle />
          {/* USER MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/ilyaasomar.png"
                  alt="@shadcn"
                />
                <AvatarFallback>IO</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={"/profile"}>
                <DropdownMenuItem>
                  <User className="h-[1.2rem] w-[1.2rem] mr-2" /> Profile
                </DropdownMenuItem>
              </Link>
              <Link to={"/login"}>
                <DropdownMenuItem variant="destructive">
                  <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                  Logout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
