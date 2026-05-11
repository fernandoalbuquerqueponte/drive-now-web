import { Calendar, Car, LogOutIcon, User } from "lucide-react";
import { Link } from "react-router-dom";

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

function Header() {
  return (
    <div className="flex w-full items-center justify-around border border-zinc-900 bg-transparent py-5">
      <Link to="/home">
        <h2 className="text-xl font-bold">DriveNOW</h2>
      </Link>

      <nav className="text-muted-foreground flex items-center gap-6">
        <a href="/home">Veículos</a>
        <a href="#">Sobre</a>
        <a href="#">Contato</a>
      </nav>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage
                  src="https://github.com/fernandoalbuquerqueponte.png"
                  alt="shadcn"
                />
                <AvatarFallback>FA</AvatarFallback>
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
              <DropdownMenuItem>
                <Car />
                Meus Carros
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bookings">
                  <Calendar />
                  Minhas reservas
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
