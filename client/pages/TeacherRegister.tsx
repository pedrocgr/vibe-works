import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import {
  TeacherRegistrationRequest,
  TeacherRegistrationResponse,
} from "@shared/api";
import { toast } from "sonner";

export default function TeacherRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [teacherCode, setTeacherCode] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(teacherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Código copiado para a área de transferência!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        } as TeacherRegistrationRequest),
      });

      const data = (await response.json()) as TeacherRegistrationResponse;

      if (!response.ok || !data.success) {
        setError(data.message || "Erro ao cadastrar professor");
        return;
      }

      if (data.teacher) {
        setTeacherCode(data.teacher.teacherCode);
        setRegistered(true);
        toast.success("Professor cadastrado com sucesso!");

        localStorage.setItem(
          "auth",
          JSON.stringify({
            email: data.teacher.email,
            fullName: data.teacher.fullName,
            id: data.teacher.id,
            teacherCode: data.teacher.teacherCode,
            authenticated: true,
            userType: "teacher",
          }),
        );
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao conectar ao servidor",
      );
      toast.error("Erro ao cadastrar professor");
    } finally {
      setIsLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50/30 flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L15.09 8.26H22L17.82 12.61L19.91 18.87L12 14.52L4.09 18.87L6.18 12.61L2 8.26H8.91L12 2Z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                MentorIA
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo ao MentorIA!
            </h1>
            <p className="text-gray-600">
              Seu código de professor foi gerado com sucesso
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-success-50 border-2 border-success-200 rounded-lg p-6">
                  <p className="text-sm text-success-700 font-medium mb-2">
                    SEU CÓDIGO DO PROFESSOR
                  </p>
                  <p className="text-4xl font-bold text-success-600 font-mono mb-4">
                    {teacherCode}
                  </p>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-2 bg-success-600 hover:bg-success-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copiar Código
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    O que fazer agora:
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex gap-2">
                      <span className="font-bold flex-shrink-0">1.</span>
                      <span>Compartilhe este código com seus alunos</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold flex-shrink-0">2.</span>
                      <span>
                        Seus alunos devem usar este código ao se cadastrarem
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold flex-shrink-0">3.</span>
                      <span>Acesse seu painel para gerenciar seus alunos</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => navigate("/teacher-dashboard")}
                    className="w-full bg-brand-500 hover:bg-brand-600 h-10"
                  >
                    Ir para Meu Painel
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full h-10"
                  >
                    Voltar ao Início
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50/30 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26H22L17.82 12.61L19.91 18.87L12 14.52L4.09 18.87L6.18 12.61L2 8.26H8.91L12 2Z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              MentorIA
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cadastro de Professor
          </h1>
          <p className="text-gray-600">Crie sua conta e gerencie seus alunos</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Seu nome completo"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Crie uma senha segura"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="h-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4 mt-0.5" required />
                <span className="text-gray-600">
                  Concordo com os{" "}
                  <a
                    href="#"
                    className="text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Termos de Serviço
                  </a>{" "}
                  e{" "}
                  <a
                    href="#"
                    className="text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Política de Privacidade
                  </a>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-500 hover:bg-brand-600 h-10 mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar Conta de Professor"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-gray-600 text-sm">
                Já tem uma conta?{" "}
                <Link
                  to="/teacher-login"
                  className="text-brand-600 hover:text-brand-700 font-medium"
                >
                  Faça login aqui
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
