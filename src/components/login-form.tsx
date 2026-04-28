import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/http/use-login";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Spinner } from "./ui/spinner";

const loginSchema = z.object({
  email: z.email("E-mail inválido").min(1, "O e-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

function LoginForm() {
  const { mutateAsync: loginUser, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof loginSchema>) {
    try {
      await loginUser({ email, password });
      toast.success("Login realizado com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao fazer login.");
    }
  }

  return (
    <div>
      <Card>
        <CardHeader className="py-2">
          <h2 className="text-lg">Login</h2>
          <p className="text-muted-foreground">Faça login para continuar.</p>
        </CardHeader>
        <CardContent className="pb-4">
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
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
              {isPending ? <Spinner /> : "Entrar"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginForm;
