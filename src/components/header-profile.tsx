/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Pencil } from "lucide-react";

import { useEditUserProfile } from "@/http/use-edit-user-profile";

import defaultAvatar from "../assets/default-avatar.png";
import EditProfileForm from "./edit-profile-form";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function HeaderProfile({ user, onSuccess }: any) {
  const { mutate: updatedUser } = useEditUserProfile();

  const handleEditProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();

      formData.append("imageUrl", file);

      updatedUser(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardContent className="w-full space-y-5 p-0">
        <div className="h-30 w-full rounded-lg bg-zinc-800/50"></div>

        <div className="flex items-center gap-3 px-6">
          <label
            htmlFor="profile-image-input"
            className="group relative shrink-0 cursor-pointer"
          >
            <div>
              <img
                src={user.imageUrl || defaultAvatar}
                alt={user.first_name + " " + user.last_name}
                className="relativeborder-background h-23 w-23 rounded-full border-4 object-cover transition-opacity group-hover:opacity-80"
              />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Pencil size={16} className="text-foreground" />
              </div>
            </div>

            <input
              type="file"
              className="hidden"
              id="profile-image-input"
              accept="image/*"
              onChange={handleEditProfile}
            />
          </label>
          <div className="w-full">
            <h1 className="text-lg font-bold">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-muted-foreground text-xs">{user.email}</p>

            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1">
                <Calendar className="text-muted-foreground gap-3" size={13} />
                <p className="text-muted-foreground text-xs">
                  Membro desde{" "}
                  {user?.created_at
                    ? format(
                        new Date(user.created_at),
                        "dd 'de' MMMM 'de' yyyy",
                        { locale: ptBR },
                      )
                    : "..."}
                </p>
              </div>

              <Dialog>
                <DialogTrigger className="hidden md:flex" asChild>
                  <Button size="sm" variant="outline">
                    <Pencil size={10} />
                    Editar perfil
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Editar Perfil</DialogTitle>
                  <DialogDescription>
                    Atualize suas informações pessoais
                  </DialogDescription>
                  <EditProfileForm data={user} onSuccess={onSuccess} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeaderProfile;
