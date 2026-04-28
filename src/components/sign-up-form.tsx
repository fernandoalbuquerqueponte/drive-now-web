import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateAccount } from "@/http/use-create-account";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Spinner } from "./ui/spinner";

const signUpForm = z.object({
  first_name: z.string().min(1, "O nome é obrigatório"),
  last_name: z.string().min(1, "O sobrenome é obrigatório"),
  email: z.email("E-mail inválido").min(1, "O e-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

function SignUpForm() {
  const { mutateAsync: signup, isPending } = useCreateAccount();

  const form = useForm<z.infer<typeof signUpForm>>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpForm>) {
    try {
      await signup(data);
      toast.success("Conta criada com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error("Erro ao criar conta.");
    }
  }

  return (
    <div>
      <Card>
        <CardHeader className="py-2">
          <h2 className="text-lg">Criar conta</h2>
          <p className="text-muted-foreground">Faça login para continuar.</p>
        </CardHeader>
        <CardContent className="pb-4">
          <form
            id="login-form"
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
                    placeholder="Digite seu nome"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                    placeholder="Digite seu sobrenome"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="Digite seu e-mail"
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    disabled={isPending}
                    placeholder="Digite sua senha"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              className="w-full"
              type="submit"
              form="login-form"
              size="lg"
            >
              {isPending ? <Spinner /> : "Criar conta"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUpForm;
