import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  BookOpen,
  TrendingUp,
  Clock,
  Play,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const subjects = [
  "Função do 2° grau",
  "Trigonometria",
  "Análise Combinatória",
  "Estatística",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [showDiagnosticAlert, setShowDiagnosticAlert] = useState(false);

  useEffect(() => {
    const hasCompleted = localStorage.getItem("hasCompletedDiagnostic");
    if (!hasCompleted) {
      setShowDiagnosticAlert(true);
    }
  }, []);

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleStartList = (listType: string) => {
    // Navigate to /resolver-questoes with list type
    window.location.href = `/resolver-questoes/lista-2024-01-15?type=${listType}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Diagnostic Alert Modal */}
      <Dialog open={showDiagnosticAlert} onOpenChange={setShowDiagnosticAlert}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Diagnóstico Necessário
            </DialogTitle>
            <DialogDescription>
              Para usar todos os recursos do MentorIA, você precisa primeiro fazer o diagnóstico inicial.
            </DialogDescription>
          </DialogHeader>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Faça o diagnóstico inicial para acessar esse recurso
            </AlertDescription>
          </Alert>
          <Button
            onClick={() => {
              setShowDiagnosticAlert(false);
              navigate("/diagnostico-inicial");
            }}
            className="w-full bg-brand-500 hover:bg-brand-600"
          >
            Ir para Diagnóstico
          </Button>
        </DialogContent>
      </Dialog>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Olá, Maria! 👋
              </h1>
              <p className="text-gray-600">
                Seu desempenho da semana está abaixo. Continue estudando!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats - Weekly Performance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Performance Geral</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                  <p className="text-xs text-gray-500">de acertos</p>
                </div>
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Questões Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500">esta semana</p>
                </div>
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tempo de Estudo</p>
                  <p className="text-2xl font-bold text-gray-900">2h 30m</p>
                  <p className="text-xs text-gray-500">esta semana</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Dias da meta concluída</p>
                  <p className="text-2xl font-bold text-gray-900">5/7</p>
                  <p className="text-xs text-gray-500">dias</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trilha Selection */}
            <Card className="border-brand-200 bg-gradient-to-r from-brand-50 to-brand-100/50">
              <CardHeader>
                <CardTitle className="flex items-center text-brand-700">
                  <Brain className="w-5 h-5 mr-2" />
                  Escolha qual tipo de trilha deseja fazer hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Generic List */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border hover:border-brand-500 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Lista Genérica
                      </h4>
                      <p className="text-sm text-gray-600">
                        Questões variadas de todos os tópicos
                      </p>
                    </div>
                    <Button
                      className="bg-brand-500 hover:bg-brand-600"
                      onClick={() => handleStartList("generico")}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Começar
                    </Button>
                  </div>

                  {/* Teacher List */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border hover:border-brand-500 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Lista do Professor
                      </h4>
                      <p className="text-sm text-gray-600">
                        Questões selecionadas pelo seu professor
                      </p>
                    </div>
                    <Button
                      className="bg-brand-500 hover:bg-brand-600"
                      onClick={() => handleStartList("professor")}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Começar
                    </Button>
                  </div>

                  {/* Personalized List with Modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between bg-white p-4 rounded-lg border hover:border-brand-500 transition-colors cursor-pointer">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Lista Personalizada
                          </h4>
                          <p className="text-sm text-gray-600">
                            Escolha os assuntos que deseja estudar
                          </p>
                        </div>
                        <Button
                          className="bg-brand-500 hover:bg-brand-600"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Começar
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Selecione os Assuntos</DialogTitle>
                        <DialogDescription>
                          Escolha quais assuntos deseja incluir na sua lista personalizada
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 py-4">
                        {subjects.map((subject) => (
                          <div
                            key={subject}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={subject}
                              checked={selectedSubjects.includes(subject)}
                              onCheckedChange={() =>
                                handleSubjectToggle(subject)
                              }
                            />
                            <Label
                              htmlFor={subject}
                              className="font-medium cursor-pointer flex-1"
                            >
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={() =>
                          handleStartList(
                            `personalizado_${selectedSubjects.join(",")}`
                          )
                        }
                        disabled={selectedSubjects.length === 0}
                        className="w-full bg-brand-500 hover:bg-brand-600"
                      >
                        Confirmar e Começar
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Performance by Topic */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Performance por Tópico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { topic: "Álgebra", score: 85, questions: 124 },
                    { topic: "Geometria", score: 72, questions: 98 },
                    { topic: "Trigonometria", score: 68, questions: 87 },
                    { topic: "Logaritmos", score: 58, questions: 76 },
                    { topic: "Funções", score: 82, questions: 112 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.topic}</span>
                        <span className="text-gray-600">
                          {item.score}% ({item.questions} questões)
                        </span>
                      </div>
                      <Progress
                        value={item.score}
                        className="h-2"
                        style={{
                          background:
                            item.score < 70
                              ? "rgb(254 226 226)"
                              : item.score < 80
                                ? "rgb(254 243 199)"
                                : "rgb(220 252 231)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Progresso Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(
                    (day, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-sm w-8 font-medium">{day}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              index < 5
                                ? "bg-success-500"
                                : index === 5
                                  ? "bg-brand-500"
                                  : "bg-gray-200"
                            }`}
                            style={{
                              width:
                                index < 5 ? "100%" : index === 5 ? "60%" : "0%",
                            }}
                          ></div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-brand-600">5/7</span>{" "}
                    dias completados
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/simulado")}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Fazer Simulado
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/historico")}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Revisar Erros
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/desempenho")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Relatórios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
