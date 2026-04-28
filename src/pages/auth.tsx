import { useEffect } from "react";

import LoginForm from "@/components/login-form";
import SignUpForm from "@/components/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import icon from "../assets/icon-removebg-preview.png";

function Authentication() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      window.location.href = "/home";
    }
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <img src={icon} alt="icone" className="h-65 w-auto object-contain" />

      <Tabs defaultValue="login" className="w-100">
        <TabsList className="grid w-full grid-cols-2" variant="line">
          <TabsTrigger value="create-account">Criar Conta</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="create-account">
          <SignUpForm />
        </TabsContent>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Authentication;
