import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Header() {
  return (
    <div className="flex w-full items-center justify-around border border-zinc-900 bg-transparent py-5">
      <h2 className="text-xl font-bold">DriveNOW</h2>

      <nav className="text-muted-foreground flex items-center gap-6">
        <a href="#">Veículos</a>
        <a href="#">Sobre</a>
        <a href="#">Contato</a>
      </nav>

      <div className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarImage src="https://github.com/fernandoalbuquerqueponte.png" />
          <AvatarFallback>FN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
