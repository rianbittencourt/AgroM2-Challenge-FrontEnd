"use client";
import React from "react";
import Image from "next/image";
import { Mail, Lock, Loader2, EyeIcon, EyeOffIcon } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciais inválidas");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Ocorreu um erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CardHeader className="space-y-4 flex flex-col items-center">
        <div className="text-center font-bold text-4xl pb-12 text-green-700 relative">
          AgroM2
        </div>
        <CardTitle className="text-2xl font-bold text-green-800">
          Bem-vindo de volta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Senha"
                className="pl-10"
                required
              />
              <div>
                {showPassword ? (
                  <EyeIcon
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <EyeOffIcon
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </CardContent>
    </>
  );
}
