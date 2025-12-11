import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Upload } from "lucide-react";
import { StudentRegistrationRequest, StudentRegistrationResponse } from "@shared/api";
import { toast } from "sonner";

export default function StudentRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    teacherCode: "",
    dailyGoal: "",
    photoFileName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photoFileName: file.name }));
    }
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

    if (!formData.teacherCode.trim()) {
      setError("Código do professor é obrigatório");
      return;
    }

    if (formData.dailyGoal && (parseInt(formData.dailyGoal) < 1 || parseInt(formData.dailyGoal) > 100)) {
      setError("Meta diária deve ser um número entre 1 e 100");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          teacherCode: formData.teacherCode,
          dailyGoal: formData.dailyGoal ? parseInt(formData.dailyGoal) : 10,
          photo: formData.photoFileName,
        } as StudentRegistrationRequest),
      });

      const data = (await response.json()) as StudentRegistrationResponse;

      if (!response.ok || !data.success) {
        setError(data.message || "Erro ao cadastrar aluno");
        toast.error(data.message || "Erro ao cadastrar aluno");
        return;
      }

      if (data.student) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            email: data.student.email,
            fullName: data.student.fullName,
            id: data.student.id,
            teacherCode: data.student.teacherCode,
            authenticated: true,
            diagnosticCompleted: false,
            diagnosticStarted: false,
            userType: "student",
          })
        );

        toast.success("Aluno cadastrado com sucesso!");
        navigate("/diagnostico-inicial");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao conectar ao servidor";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50/30 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26H22L17.82 12.61L19.91 18.87L12 14.52L4.09 18.87L6.18 12.61L2 8.26H8.91L12 2Z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              MentorIA
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Comece agora</h1>
          <p className="text-gray-600">Crie sua conta e tenha acesso a todos os recursos</p>
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
                  Código do Professor <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="teacherCode"
                  placeholder="Ex: PROF2024001"
                  value={formData.teacherCode}
                  onChange={handleInputChange}
                  required
                  className="h-10 uppercase"
                />
                <p className="text-xs text-gray-500">Código fornecido por seu professor</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome Completo</label>
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
                <label className="text-sm font-medium text-gray-700">Email</label>
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
                <label className="text-sm font-medium text-gray-700">Senha</label>
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
                <label className="text-sm font-medium text-gray-700">Confirmar Senha</label>
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Foto de Perfil <span className="text-gray-500">(opcional)</span>
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-10 border-2 border-dashed border-gray-300 rounded-lg hover:border-brand-500 transition-colors flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-brand-600"
                >
                  <Upload className="h-4 w-4" />
                  {formData.photoFileName ? formData.photoFileName : "Selecionar imagem"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Meta Diária de Questões <span className="text-gray-500">(opcional)</span>
                </label>
                <Input
                  type="number"
                  name="dailyGoal"
                  placeholder="Ex: 15"
                  value={formData.dailyGoal}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                  className="h-10"
                />
                <p className="text-xs text-gray-500">Quantidade de questões que deseja resolver por dia (padrão: 10)</p>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4 mt-0.5" required />
                <span className="text-gray-600">
                  Concordo com os{" "}
                  <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">
                    Termos de Serviço
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">
                    Política de Privacidade
                  </a>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-500 hover:bg-brand-600 h-10 mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-gray-600 text-sm">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
                  Faça login aqui
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
