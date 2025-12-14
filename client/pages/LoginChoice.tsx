import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users } from "lucide-react";

export default function LoginChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50/30 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-12">
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
            Bem-vindo de volta
          </h1>
          <p className="text-gray-600">
            Selecione o tipo de conta que você deseja acessar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Teacher Login Card */}
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => navigate("/teacher-login")}
          >
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <CardTitle className="text-xl">Sou Professor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-gray-600 text-sm">
                Acesse seu painel para gerenciar alunos e acompanhar seu
                desempenho
              </p>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 h-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/teacher-login");
                }}
              >
                Entrar como Professor
              </Button>
              <p className="text-xs text-gray-500">
                Não tem uma conta?{" "}
                <Link
                  to="/teacher-register"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Cadastre-se aqui
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Student Login Card */}
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-xl">Sou Aluno</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-gray-600 text-sm">
                Acesse suas aulas, questões e acompanhe seu progresso acadêmico
              </p>
              <Button
                className="w-full bg-brand-500 hover:bg-brand-600 h-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/login");
                }}
              >
                Entrar como Aluno
              </Button>
              <p className="text-xs text-gray-500">
                Não tem uma conta?{" "}
                <Link
                  to="/register"
                  className="text-brand-600 hover:text-brand-700 font-medium"
                >
                  Cadastre-se aqui
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
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
