import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "@/components/login-form";
import SignUpForm from "@/components/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import icon from "../assets/icon-removebg-preview.png";

function Authentication() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 px-6">
      <img src={icon} alt="icone" className="h-65 w-auto object-contain" />

      <Tabs defaultValue="login" className="w-full max-w-100">
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
