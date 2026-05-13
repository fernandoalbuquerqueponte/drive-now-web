/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Lock, Mail, Pencil, Phone, User } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EditProfileForm from "./edit-profile-form";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Label } from "./ui/label";

function PersonalDataCard({ user }: any) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <User size={22} />
        <CardTitle>Dados Pessoais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-muted-foreground">
              Nome Completo
            </Label>
            <InputGroup>
              <InputGroupInput
                value={user.first_name + " " + user.last_name}
                readOnly
                key={user.first_name}
              />
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">
              Email
            </Label>
            <InputGroup>
              <InputGroupInput value={user.email} readOnly />
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-muted-foreground">
              Telefone
            </Label>
            <InputGroup>
              <InputGroupInput defaultValue="(88) 99999-9999" readOnly />
              <InputGroupAddon>
                <Phone />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="createdAt" className="text-muted-foreground">
              Data de Cadastro
            </Label>
            <InputGroup>
              <InputGroupInput defaultValue="10 de maio de 2026" readOnly />
              <InputGroupAddon>
                <Calendar />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-3">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Pencil />
              Editar Dados
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
              <DialogDescription>
                Atualize suas informações pessoais
              </DialogDescription>
            </DialogHeader>
            <EditProfileForm data={user} onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
        <Button>
          <Lock />
          Alterar Senha
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PersonalDataCard;
