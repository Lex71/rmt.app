import { LogOut, RectangleEllipsis /* Settings, User */ } from "lucide-react";
import { Link, NavLink } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import img from "@/assets/avatar.jpeg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useConfig } from "@/hooks/useConfig";
// import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const { isAuthenticated, user, signout } = useAuth();
  // const navigation = [
  //   { name: "Home", href: "/home", current: true, visible: true },
  //   {
  //     name: "Facilities",
  //     href: "/facilities",
  //     current: false,
  //     visible: user && user.role === "admin",
  //   },
  //   {
  //     name: "Tables",
  //     href: "/tables",
  //     current: false,
  //     visible: user && user.role === "user",
  //   },
  //   {
  //     name: "Reservations",
  //     href: "/reservations",
  //     current: false,
  //     visible: user && user.role === "user",
  //   },
  // ];
  const { navigation } = useConfig();

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    signout();
  };

  return (
    <nav className="flex items-center justify-between h-20 px-4 shadow-md  dark:shadow-md">
      {/* LEFT */}
      {/* <SidebarTrigger /> */}
      <div className="text-xl font-bold sm:text-2xl">
        <h2>Reserve My Table</h2>
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* <Link to="/home" className="cursor-pointer">
          Home
        </Link> */}
        {/* <div className="hidden sm:ml-6 sm:block"> */}
        <div className="sm:ml-6 sm:block">
          <div className="flex flex-col sm:flex-row space-x-4">
            {navigation.map(
              (item) =>
                item.visible && (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      "text-indigo-300 hover:text-gray-300 px-3 py-0 sm:py-2 rounded-md text-sm font-medium" +
                      (isActive ? " bg-gray-700" : "")
                    }
                  >
                    {item.name}
                  </NavLink>
                ),
            )}
          </div>
        </div>
        <ModeToggle />
        {/* <Moon className="cursor-pointer" /> */}
        {/* <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <DropdownMenu>
          {/* <DropdownMenuTrigger asChild> */}
          {/* <Button variant="outline">Open</Button> */}
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar>
              <AvatarImage src={img} alt="@shadcn" className="grayscale" />
              <AvatarFallback>RMT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                {user?.name ?? "My Account"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>
                <User className="mr-2 h-1.5 w-4" />
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem> */}

              <DropdownMenuItem>
                <RectangleEllipsis className="mr-2 h-1.5 w-4" />
                <Link
                  to="/change-password"
                  // className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                  Change password
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-left p-0 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {/* <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
