"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import LoginScreen from "@/components/screens/LoginScreen";
import RegisterScreen from "@/components/screens/RegisterScreen";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        {screen === "login" && <LoginScreen />}
        {screen === "register" && <RegisterScreen onScreenChange={setScreen} />}
        {screen === "login" && (
          <p className=" py-5 pl-2">
            Não possui uma conta?
            <a
              className="cursor-pointer pl-2 text-blue-500 hover:text-blue-700 duration-300 "
              onClick={() => setScreen("register")}
            >
              Cadastre-se
            </a>
          </p>
        )}
        {screen === "register" && (
          <p className=" py-5 pl-2">
            Ja possui uma conta?
            <a
              className="cursor-pointer pl-2 text-blue-500 hover:text-blue-700 duration-300 "
              onClick={() => setScreen("login")}
            >
              Fazer Login
            </a>
          </p>
        )}
      </Card>
    </div>
  );
}
