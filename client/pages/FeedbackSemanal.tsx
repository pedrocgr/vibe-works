import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  BookOpen,
  Clock,
  Brain,
  Award,
  AlertTriangle,
  CheckCircle,
  Mail,
  Bell,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock weekly feedback data
const weeklyFeedback = {
  week: {
    start: "2024-01-08",
    end: "2024-01-14",
    number: 4,
  },
  performance: {
    current: 78,
    previous: 72,
    trend: "up",
    trendValue: 6,
  },
  activities: {
    listsCompleted: 6,
    questionsAnswered: 84,
    timeStudied: 420, // minutes
    streak: 7,
  },
  topicProgress: [
    {
      topic: "Álgebra",
      currentScore: 85,
      previousScore: 82,
      trend: "up",
      questionsAnswered: 24,
    },
    {
      topic: "Geometria",
      currentScore: 72,
      previousScore: 70,
      trend: "up",
      questionsAnswered: 18,
    },
    {
      topic: "Trigonometria",
      currentScore: 68,
      previousScore: 76,
      trend: "down",
      questionsAnswered: 16,
    },
    {
      topic: "Logaritmos",
      currentScore: 58,
      previousScore: 45,
      trend: "up",
      questionsAnswered: 14,
    },
    {
      topic: "Funções",
      currentScore: 82,
      previousScore: 80,
      trend: "stable",
      questionsAnswered: 12,
    },
  ],
  strengths: [
    "Consistência nos estudos - 7 dias seguidos!",
    "Melhoria significativa em Logaritmos (+13 pontos)",
    "Tempo de estudo acima da meta semanal",
    "Excelente performance em Álgebra",
  ],
  weaknesses: [
    "Queda de performance em Trigonometria (-8 pontos)",
    "Tempo médio por questão ainda alto (5min)",
    "Poucas questões de nível avançado resolvidas",
  ],
  recommendations: [
    {
      type: "focus",
      title: "Priorize Trigonometria",
      description:
        "Dedique mais tempo às funções trigonométricas e identidades",
      urgency: "alta",
      estimatedTime: "2-3 sessões",
    },
    {
      type: "practice",
      title: "Aumente a Velocidade",
      description:
        "Pratique questões com cronômetro para reduzir tempo por questão",
      urgency: "média",
      estimatedTime: "1 semana",
    },
    {
      type: "challenge",
      title: "Questões Avançadas",
      description:
        "Inclua mais questões de nível avançado em suas listas diárias",
      urgency: "baixa",
      estimatedTime: "Gradual",
    },
  ],
  goals: {
    weekly: {
      target: 350, // minutes
      achieved: 420,
      percentage: 120,
    },
    accuracy: {
      target: 75,
      achieved: 78,
      percentage: 104,
    },
    streak: {
      target: 5,
      achieved: 7,
      percentage: 140,
    },
  },
  nextWeekPlan: [
    "Foco em Trigonometria (30% das questões)",
    "Praticar com cronômetro diário",
    "Meta: 80% de aproveitamento geral",
    "Manter sequência de estudos",
  ],
};

const historicalWeeks = [
  { week: 1, performance: 65, activities: 45 },
  { week: 2, performance: 68, activities: 52 },
  { week: 3, performance: 72, activities: 58 },
  { week: 4, performance: 78, activities: 84 },
];

export default function FeedbackSemanal() {
  const [selectedTab, setSelectedTab] = useState("resumo");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
    });
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getTrendIcon = (trend: string, value?: number) => {
    switch (trend) {
      case "up":
        return (
          <div className="flex items-center text-success-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            {value && <span className="text-sm font-medium">+{value}</span>}
          </div>
        );
      case "down":
        return (
          <div className="flex items-center text-red-600">
            <TrendingDown className="w-4 h-4 mr-1" />
            {value && <span className="text-sm font-medium">-{value}</span>}
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-500">
            <span className="text-sm font-medium">Estável</span>
          </div>
        );
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "alta":
        return <Badge className="bg-red-100 text-red-700">Alta</Badge>;
      case "média":
        return <Badge className="bg-orange-100 text-orange-700">Média</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-700">Baixa</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Relatório Semanal
                </h1>
                <p className="text-gray-600">
                  Semana {weeklyFeedback.week.number} •{" "}
                  {formatDate(weeklyFeedback.week.start)} -{" "}
                  {formatDate(weeklyFeedback.week.end)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar por Email
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Configurar Notificações
                </Button>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <Card className="mb-8 bg-gradient-to-r from-brand-50 to-brand-100/30 border-brand-200">
            <CardHeader>
              <CardTitle className="flex items-center text-brand-900">
                <Award className="w-5 h-5 mr-2" />
                Resumo da Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-brand-600">
                      {weeklyFeedback.performance.current}%
                    </span>
                    <div className="ml-2">
                      {getTrendIcon(
                        weeklyFeedback.performance.trend,
                        weeklyFeedback.performance.trendValue,
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Performance Geral</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {weeklyFeedback.activities.listsCompleted}
                  </div>
                  <p className="text-sm text-gray-600">Listas Completadas</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {formatTime(weeklyFeedback.activities.timeStudied)}
                  </div>
                  <p className="text-sm text-gray-600">Tempo Estudado</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {weeklyFeedback.activities.streak}
                  </div>
                  <p className="text-sm text-gray-600">Dias Consecutivos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="resumo">Resumo</TabsTrigger>
              <TabsTrigger value="topicos">Por Tópico</TabsTrigger>
              <TabsTrigger value="metas">Metas</TabsTrigger>
              <TabsTrigger value="plano">Próxima Semana</TabsTrigger>
            </TabsList>

            <TabsContent value="resumo" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Strengths */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-success-700">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Pontos Fortes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {weeklyFeedback.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {strength}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Weaknesses */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-700">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Áreas de Melhoria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {weeklyFeedback.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {weakness}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Recomendações da IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyFeedback.recommendations.map(
                      (recommendation, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {recommendation.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {getUrgencyBadge(recommendation.urgency)}
                              <Badge variant="outline" className="text-xs">
                                {recommendation.estimatedTime}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {recommendation.description}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topicos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Evolução por Tópico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyFeedback.topicProgress.map((topic) => (
                      <div
                        key={topic.topic}
                        className="p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-gray-900">
                              {topic.topic}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                              {topic.questionsAnswered} questões
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-3">
                            {getTrendIcon(topic.trend)}
                            <span className="text-lg font-bold text-gray-900">
                              {topic.currentScore}%
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Semana atual</span>
                            <span>{topic.currentScore}%</span>
                          </div>
                          <Progress
                            value={topic.currentScore}
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Semana anterior: {topic.previousScore}%</span>
                            <span>
                              Variação:{" "}
                              {topic.currentScore - topic.previousScore > 0
                                ? "+"
                                : ""}
                              {topic.currentScore - topic.previousScore}pp
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metas" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      Tempo de Estudo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-purple-600">
                        {weeklyFeedback.goals.weekly.percentage}%
                      </div>
                      <p className="text-sm text-gray-600">da meta semanal</p>
                    </div>
                    <Progress
                      value={Math.min(
                        weeklyFeedback.goals.weekly.percentage,
                        100,
                      )}
                      className="mb-3"
                    />
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Meta:</span>
                        <span>
                          {formatTime(weeklyFeedback.goals.weekly.target)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Alcançado:</span>
                        <span className="font-semibold text-purple-600">
                          {formatTime(weeklyFeedback.goals.weekly.achieved)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-sm">
                      <Target className="w-4 h-4 mr-2" />
                      Precisão
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {weeklyFeedback.goals.accuracy.percentage}%
                      </div>
                      <p className="text-sm text-gray-600">
                        da meta de precisão
                      </p>
                    </div>
                    <Progress
                      value={Math.min(
                        weeklyFeedback.goals.accuracy.percentage,
                        100,
                      )}
                      className="mb-3"
                    />
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Meta:</span>
                        <span>{weeklyFeedback.goals.accuracy.target}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Alcançado:</span>
                        <span className="font-semibold text-blue-600">
                          {weeklyFeedback.goals.accuracy.achieved}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-sm">
                      <Award className="w-4 h-4 mr-2" />
                      Sequência
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-orange-600">
                        {weeklyFeedback.goals.streak.percentage}%
                      </div>
                      <p className="text-sm text-gray-600">
                        da meta de sequência
                      </p>
                    </div>
                    <Progress
                      value={Math.min(
                        weeklyFeedback.goals.streak.percentage,
                        100,
                      )}
                      className="mb-3"
                    />
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Meta:</span>
                        <span>{weeklyFeedback.goals.streak.target} dias</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Alcançado:</span>
                        <span className="font-semibold text-orange-600">
                          {weeklyFeedback.goals.streak.achieved} dias
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Historical Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Progresso Histórico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historicalWeeks.map((week) => (
                      <div
                        key={week.week}
                        className="flex items-center space-x-4"
                      >
                        <span className="text-sm font-medium w-16">
                          Sem {week.week}
                        </span>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Performance</span>
                            <span>{week.performance}%</span>
                          </div>
                          <Progress value={week.performance} className="h-2" />
                        </div>
                        <div className="text-sm text-gray-600 w-20 text-right">
                          {week.activities} questões
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plano" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Plano para Próxima Semana
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyFeedback.nextWeekPlan.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-brand-50 rounded-lg"
                      >
                        <ArrowRight className="w-4 h-4 text-brand-600 mr-3 flex-shrink-0" />
                        <span className="text-sm text-brand-800">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Alert className="mt-6">
                    <Brain className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Dica da IA:</strong> Baseado no seu progresso
                      atual, sugerimos manter o foco em Trigonometria enquanto
                      consolida os ganhos em Logaritmos. Pequenos ajustes
                      constantes levam a grandes resultados!
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => (window.location.href = "/configuracoes")}
                      className="flex-1"
                    >
                      Ajustar Preferências
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/lista-questoes")}
                      className="flex-1 bg-brand-500 hover:bg-brand-600"
                    >
                      Começar Nova Semana
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
