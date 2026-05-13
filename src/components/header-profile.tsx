/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Pencil } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

function HeaderProfile({ user }: any) {
  // console.log(user);
  return (
    <Card>
      <CardContent className="w-full space-y-5 p-0">
        <div className="h-30 w-full rounded-lg bg-zinc-800/50"></div>

        <div className="flex items-center gap-3 px-6">
          <img
            src={user.imageUrl}
            alt="fernandoalbuquerqueponte"
            className="w-23 rounded-full"
          />
          <div className="w-full">
            <h1 className="text-lg font-bold">Fernando albuquerque</h1>
            <p className="text-muted-foreground text-xs">{user.email}</p>

            <div className="w-full">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1">
                  <Calendar className="text-muted-foreground gap-3" size={13} />
                  <p className="text-muted-foreground text-xs">
                    Membro desde 10 de maio de 2026
                  </p>
                </div>

                <Button size="sm" variant="outline">
                  <Pencil size={10} />
                  Editar perfil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeaderProfile;
