import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login - in production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Store auth state in localStorage
      localStorage.setItem("auth", JSON.stringify({ email, authenticated: true }));

      // Check if diagnostic is completed, if not redirect to diagnostic
      const hasCompleted = localStorage.getItem("hasCompletedDiagnostic");
      if (!hasCompleted) {
        navigate("/diagnostico-inicial");
      } else {
        navigate("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50/30 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and heading */}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h1>
          <p className="text-gray-600">Entre com sua conta para continuar</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-center">Entrar na sua conta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Senha</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-gray-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">
                  Esqueceu a senha?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-500 hover:bg-brand-600 h-10"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-gray-600 text-sm">
                Não tem uma conta?{" "}
                <Link to="/register" className="text-brand-600 hover:text-brand-700 font-medium">
                  Cadastre-se agora
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
