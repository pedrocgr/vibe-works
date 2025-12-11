import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Play,
  SkipForward,
  RefreshCw,
  Clock,
  Target,
  BookOpen,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

// Mock daily list data
const todaysList = {
  id: "lista-2024-01-15",
  date: "2024-01-15",
  title: "Lista Personalizada #47",
  description:
    "Baseada no seu desempenho recente em Trigonometria e Logaritmos",
  totalQuestions: 15,
  estimatedTime: 45,
  difficulty: "Intermediária",
  focusTopics: ["Trigonometria", "Logaritmos", "Funções"],
  status: "pending", // pending, in_progress, completed, skipped
  aiRecommendation: {
    reason:
      "Detectamos que você precisa reforçar conceitos de funções trigonométricas e propriedades de logaritmos.",
    weakTopics: ["Trigonometria", "Logaritmos"],
    strongTopics: ["Álgebra", "Geometria"],
    priority: "alta",
  },
  questions: [
    {
      id: 1,
      topic: "Trigonometria",
      difficulty: "intermediário",
      weight: 0.8,
    },
    {
      id: 2,
      topic: "Logaritmos",
      difficulty: "intermediário",
      weight: 0.9,
    },
    // ... mais questões
  ],
};

const previousLists = [
  {
    id: "lista-2024-01-14",
    date: "2024-01-14",
    title: "Lista Personalizada #46",
    status: "completed",
    score: 78,
    completedQuestions: 12,
    totalQuestions: 15,
  },
  {
    id: "lista-2024-01-13",
    date: "2024-01-13",
    title: "Lista Personalizada #45",
    status: "completed",
    score: 85,
    completedQuestions: 15,
    totalQuestions: 15,
  },
  {
    id: "lista-2024-01-12",
    date: "2024-01-12",
    title: "Lista Personalizada #44",
    status: "skipped",
    score: 0,
    completedQuestions: 0,
    totalQuestions: 18,
  },
];

export default function ListaQuestoes() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCompletedDiagnostic, setHasCompletedDiagnostic] = useState(true);

  useEffect(() => {
    const completed = localStorage.getItem("hasCompletedDiagnostic");
    setHasCompletedDiagnostic(completed === "true");
  }, []);

  const handleStartList = () => {
    navigate(`/resolver-questoes/${todaysList.id}`);
  };

  const handleSkipList = () => {
    // Simulate skipping today's list and generating a lighter alternative
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would update the list data
    }, 2000);
  };

  const handleRegenerateList = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would regenerate the list
    }, 3000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string, score?: number) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success-100 text-success-700 hover:bg-success-100">
            Concluída ({score}%)
          </Badge>
        );
      case "skipped":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            Pulada
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Em Andamento
          </Badge>
        );
      default:
        return (
          <Badge className="bg-brand-100 text-brand-700 hover:bg-brand-100">
            Pendente
          </Badge>
        );
    }
  };

  // If user hasn't completed diagnostic, show prompt
  if (!hasCompletedDiagnostic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="py-12">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Diagnóstico Necessário
                </h2>
                <p className="text-gray-600 mb-6">
                  Para gerar listas personalizadas, você precisa primeiro
                  completar o diagnóstico inicial que nos ajuda a entender seu
                  nível atual.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => navigate("/diagnostico-inicial")}
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                  >
                    Fazer Diagnóstico
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Listas Personalizadas
            </h1>
            <p className="text-gray-600">
              Questões selecionadas especialmente para você pela nossa IA
            </p>
          </div>

          {/* Today's List */}
          <Card className="mb-8 border-brand-200 bg-gradient-to-r from-brand-50 to-brand-100/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-brand-900">
                      Lista de Hoje
                    </CardTitle>
                    <p className="text-sm text-brand-700">
                      {formatDate(todaysList.date)}
                    </p>
                  </div>
                </div>
                <Badge className="bg-brand-600 text-white hover:bg-brand-600">
                  Prioridade {todaysList.aiRecommendation.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Recommendation */}
              <Alert className="border-brand-200 bg-white">
                <Brain className="h-4 w-4 text-brand-600" />
                <AlertDescription className="text-brand-800">
                  <strong>Recomendação da IA:</strong>{" "}
                  {todaysList.aiRecommendation.reason}
                </AlertDescription>
              </Alert>

              {/* List Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">
                    {todaysList.totalQuestions}
                  </div>
                  <div className="text-xs text-gray-600">Questões</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <Clock className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">
                    {todaysList.estimatedTime}min
                  </div>
                  <div className="text-xs text-gray-600">Estimado</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <Target className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">
                    {todaysList.difficulty}
                  </div>
                  <div className="text-xs text-gray-600">Dificuldade</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">
                    {todaysList.focusTopics.length}
                  </div>
                  <div className="text-xs text-gray-600">Tópicos</div>
                </div>
              </div>

              {/* Focus Topics */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Tópicos em Foco:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {todaysList.focusTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="bg-white text-gray-700"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleStartList}
                  className="flex-1 bg-brand-500 hover:bg-brand-600"
                  disabled={isGenerating}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Começar Lista
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSkipList}
                  disabled={isGenerating}
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Pular Hoje
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRegenerateList}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  {isGenerating ? "Gerando..." : "Regenerar"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Previous Lists */}
          <Card>
            <CardHeader>
              <CardTitle>Listas Anteriores</CardTitle>
              <p className="text-sm text-gray-600">
                Histórico das suas últimas atividades
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previousLists.map((list) => (
                  <div
                    key={list.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {list.title}
                        </h4>
                        {getStatusBadge(list.status, list.score)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{formatDate(list.date)}</span>
                        <span>
                          {list.completedQuestions}/{list.totalQuestions}{" "}
                          questões
                        </span>
                      </div>
                      {list.status === "completed" && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={list.score}
                              className="flex-1 h-2"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {list.score}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {list.status === "completed" && (
                      <Button variant="outline" size="sm">
                        Revisar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
