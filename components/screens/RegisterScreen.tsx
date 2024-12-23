"use client";
import React from "react";
import Image from "next/image";
import { Mail, Lock, Loader2, User } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

// Esquema Zod para validação do formulário
const registerSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório."),
    email: z.string().email("Formato de email inválido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "A senha de confirmação deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

interface RegisterScreenProps {
  onScreenChange: (screen: "login" | "register") => void;
}

export default function RegisterScreen({
  onScreenChange,
}: RegisterScreenProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus(null);

    // Validação usando Zod
    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const { name, email, password } = formData;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "Ocorreu um erro.");
      setStatus("error");
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
          Cadastre-se
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === null && (
            <>
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Digite seu Nome"
                    className="pl-10"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="pl-10"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    name="confirmPassword"
                    placeholder="Confirme sua Senha"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </>
          )}
          {status === "success" && (
            <>
              <div className="flex bg-blue-500/10 p-2 items-center justify-center py-2">
                <h2 className="text-stone-500 font-bold">
                  Usuário cadastrado com sucesso!
                </h2>
              </div>
            </>
          )}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {status === null && (
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Cadastrar"
              )}
            </Button>
          )}
          {status === "success" && (
            <Button
              type="button"
              onClick={() => onScreenChange("login")}
              className="w-full bg-green-700 hover:bg-green-800"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Voltar para Login"
              )}
            </Button>
          )}
        </form>
      </CardContent>
    </>
  );
}
