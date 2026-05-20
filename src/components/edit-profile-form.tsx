/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useEditUserProfile } from "@/http/use-edit-user-profile";

import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const editProfileForm = z
  .object({
    first_name: z.string().min(1, "O nome é obrigatório"),
    last_name: z.string().min(1, "O sobrenome é obrigatório"),
    email: z.email("E-mail inválido").min(1, "O e-mail é obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  })
  .partial();

interface EditProfileFormProps {
  data: any;
  onSuccess: () => void;
}

function EditProfileForm({ data: user, onSuccess }: EditProfileFormProps) {
  const { mutateAsync: editForm } = useEditUserProfile();

  const form = useForm<z.infer<typeof editProfileForm>>({
    resolver: zodResolver(editProfileForm),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
  });

  async function onSubmit(data: z.infer<typeof editProfileForm>) {
    try {
      await editForm(data);
      onSuccess();
    } catch (error) {
      console.error("Erro ao editar:", error);
    }
  }

  return (
    <div className="flex flex-col">
      <form
        id="edit-profile"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Controller
          name="first_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="first_name"
                placeholder="Digite seu nome"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="last_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Sobrenome</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="last_name"
                placeholder="Digite seu sobrenome"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="last_name"
                placeholder="Digite seu e-mail"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <DialogFooter>
          <Field orientation="horizontal">
            <Button
              className="w-full"
              type="submit"
              form="edit-profile"
              size="lg"
            >
              Salvar alterações
            </Button>
          </Field>
        </DialogFooter>
      </form>
    </div>
  );
}

export default EditProfileForm;
