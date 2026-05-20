import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Car, LogOutIcon, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetUser } from "@/http/use-get-user";

function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useGetUser();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    queryClient.clear();
    navigate("/authentication");
  };

  return (
    <header className="flex w-full items-center justify-around border border-zinc-900 bg-transparent py-5">
      <Link to="/home">
        <h2 className="text-xl font-bold">DriveNOW</h2>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar size="lg">
              <AvatarImage
                src={user?.imageUrl as string}
                alt={user?.first_name + " " + user?.last_name}
              />
              <AvatarFallback>
                {(user?.first_name[0] as string) +
                  (user?.last_name[0] as string)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/account">
                <User />
                Conta
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/my-cars">
                <Car />
                Meus Carros
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/bookings">
                <Calendar />
                Minhas reservas
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon />
            <span className="text-destructive">Sair da conta</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Header;
