import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/login-form";

function Authentication() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-100">
        <TabsList className="grid w-full grid-cols-2" variant="line">
          <TabsTrigger value="create-account">Criar Conta</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="create-account">
          <div>Formulário de criação de conta para teste</div>
        </TabsContent>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Authentication;
