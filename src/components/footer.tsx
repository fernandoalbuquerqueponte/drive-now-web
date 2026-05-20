export default function Footer() {
  return (
    <footer className="text-muted-foreground bg-primary-foreground flex h-20 items-center justify-between px-10 py-4 text-sm">
      <h1 className="text-lg font-bold text-white">DriveNow</h1>

      <p className="text-sm">
        Criado por{"  "}
        <span className="text-foreground font-medium">
          Fernando Albuquerque
        </span>
      </p>

      <div className="flex items-center gap-5">
        <a
          href="https://github.com/fernandoalbuquerqueponte"
          target="_blank"
          className="hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/fernandoalbuquerqueponte"
          target="_blank"
          className="hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
