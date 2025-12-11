import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Users,
  LogOut,
  Copy,
  Check,
  Mail,
  Calendar,
  Target,
  Search,
} from "lucide-react";
import { TeacherStudentsResponse } from "@shared/api";
import { toast } from "sonner";

interface Student {
  id: string;
  email: string;
  fullName: string;
  dailyGoal: number;
  createdAt: string;
}

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (!authData) {
      navigate("/teacher-login");
      return;
    }

    const auth = JSON.parse(authData);
    if (auth.userType !== "teacher") {
      navigate("/teacher-login");
      return;
    }

    setTeacher(auth);
    fetchStudents(auth.id);
  }, [navigate]);

  const fetchStudents = async (teacherId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/auth/teacher/${teacherId}/students`);
      const data = (await response.json()) as TeacherStudentsResponse;

      if (data.success) {
        setStudents(data.students);
      } else {
        toast.error(data.error || "Erro ao carregar alunos");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Erro ao carregar alunos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(teacher.teacherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Código copiado para a área de transferência!");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    toast.success("Desconectado com sucesso!");
    navigate("/");
  };

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!teacher) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26H22L17.82 12.61L19.91 18.87L12 14.52L4.09 18.87L6.18 12.61L2 8.26H8.91L12 2Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">MentorIA</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Bem-vindo, <strong>{teacher.fullName}</strong>
            </span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Teacher Code Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-1 bg-gradient-to-br from-brand-50 to-brand-100/50 border-brand-200">
            <CardHeader>
              <CardTitle className="text-sm text-brand-700">Seu Código de Professor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-4 border-2 border-brand-300">
                <p className="text-3xl font-bold text-brand-600 font-mono text-center">
                  {teacher.teacherCode}
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors"
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
              <p className="text-xs text-gray-600 text-center">
                Compartilhe este código com seus alunos
              </p>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Alunos</p>
                  <p className="text-3xl font-bold text-gray-900">{students.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">E-mail</p>
                  <p className="text-sm font-mono text-gray-900 truncate">{teacher.email}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Seus Alunos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar aluno por nome ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Carregando alunos...</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  {searchQuery ? "Nenhum aluno encontrado" : "Nenhum aluno associado ainda"}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Compartilhe seu código: <strong>{teacher.teacherCode}</strong>
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Meta Diária</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Data de Cadastro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-900">{student.fullName}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-600 text-sm">{student.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-orange-600" />
                            <span className="text-gray-900 font-medium">{student.dailyGoal}</span>
                            <span className="text-gray-500 text-sm">questões/dia</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 text-sm">
                              {new Date(student.createdAt).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Dica</h3>
            <p className="text-blue-800 text-sm">
              Para associar um novo aluno a sua turma, compartilhe seu código de professor{" "}
              <strong>{teacher.teacherCode}</strong> com ele. Os alunos devem usar este código ao se registrarem na plataforma.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
