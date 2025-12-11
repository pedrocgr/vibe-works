import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Clock,
  Target,
  Play,
  BookOpen,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  Flag,
  Pause,
  SkipForward,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock simulado data
const simuladoData = {
  id: "simulado-medicina-2024",
  title: "Simulado Geral - Matemática",
  description:
    "Simulado completo baseado no padrão dos vestibulares de Medicina",
  totalQuestions: 20,
  timeLimit: 3600, // 60 minutes in seconds
  difficulty: "Misto",
  topics: ["Álgebra", "Geometria", "Trigonometria", "Logaritmos", "Funções"],
  requiredLists: 30,
  estimatedScore: 75, // Based on recent performance
};

const simuladoQuestions = [
  {
    id: 1,
    topic: "Álgebra",
    question: "O conjunto solução da inequação 2x - 3 > 7 é:",
    alternatives: [
      { id: "a", text: "x > 5" },
      { id: "b", text: "x < 5" },
      { id: "c", text: "x > -5" },
      { id: "d", text: "x < -5" },
    ],
    correctAnswer: "a",
    difficulty: "intermediário",
  },
  {
    id: 2,
    topic: "Geometria",
    question: "A área de um círculo de raio 4 cm é:",
    alternatives: [
      { id: "a", text: "8π cm²" },
      { id: "b", text: "16π cm²" },
      { id: "c", text: "4π cm²" },
      { id: "d", text: "12π cm²" },
    ],
    correctAnswer: "b",
    difficulty: "básico",
  },
  // Add more questions to reach 20 total...
];

type SimuladoPhase =
  | "intro"
  | "warning"
  | "testing"
  | "paused"
  | "completed"
  | "results";

export default function SimuladoFinal() {
  const [phase, setPhase] = useState<SimuladoPhase>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(simuladoData.timeLimit);
  const [isPaused, setIsPaused] = useState(false);
  const [completedLists, setCompletedLists] = useState(32); // Mock data
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  // Check if user has completed enough lists
  const canTakeSimulado = completedLists >= simuladoData.requiredLists;

  // Timer effect
  useEffect(() => {
    if (phase === "testing" && !isPaused && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);

        // Show warning when 5 minutes left
        if (timeRemaining === 300 && !showTimeWarning) {
          setShowTimeWarning(true);
          setTimeout(() => setShowTimeWarning(false), 5000);
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && phase === "testing") {
      handleTimeUp();
    }
  }, [timeRemaining, phase, isPaused, showTimeWarning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStartSimulado = () => {
    setPhase("warning");
  };

  const confirmStart = () => {
    setPhase("testing");
  };

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
    }

    setSelectedAnswer("");

    if (currentQuestion < simuladoQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Load previous answer if exists
      if (answers[currentQuestion + 1]) {
        setSelectedAnswer(answers[currentQuestion + 1]);
      }
    } else {
      finishSimulado();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    setPhase("paused");
  };

  const handleResume = () => {
    setIsPaused(false);
    setPhase("testing");
  };

  const handleTimeUp = () => {
    setPhase("completed");
    setTimeout(() => {
      finishSimulado();
    }, 2000);
  };

  const finishSimulado = () => {
    const results = calculateResults();
    localStorage.setItem(
      `simulado_${simuladoData.id}`,
      JSON.stringify({
        answers,
        results,
        timeSpent: simuladoData.timeLimit - timeRemaining,
        completedAt: Date.now(),
      }),
    );

    setPhase("results");
  };

  const calculateResults = () => {
    let correct = 0;
    const topicResults: Record<string, { correct: number; total: number }> = {};

    simuladoQuestions.forEach((question, index) => {
      if (!topicResults[question.topic]) {
        topicResults[question.topic] = { correct: 0, total: 0 };
      }
      topicResults[question.topic].total++;

      if (answers[index] === question.correctAnswer) {
        correct++;
        topicResults[question.topic].correct++;
      }
    });

    const percentage = Math.round((correct / simuladoQuestions.length) * 100);

    return {
      correct,
      total: simuladoQuestions.length,
      percentage,
      topicResults: Object.entries(topicResults).map(([topic, scores]) => ({
        topic,
        percentage: Math.round((scores.correct / scores.total) * 100),
        correct: scores.correct,
        total: scores.total,
      })),
      timeSpent: simuladoData.timeLimit - timeRemaining,
    };
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80)
      return {
        level: "Excelente",
        color: "text-success-600",
        bg: "bg-success-100",
      };
    if (percentage >= 70)
      return { level: "Bom", color: "text-blue-600", bg: "bg-blue-100" };
    if (percentage >= 60)
      return {
        level: "Regular",
        color: "text-orange-600",
        bg: "bg-orange-100",
      };
    return {
      level: "Precisa Melhorar",
      color: "text-red-600",
      bg: "bg-red-100",
    };
  };

  if (!canTakeSimulado) {
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
                  Requisitos Não Atendidos
                </h2>
                <p className="text-gray-600 mb-6">
                  Para participar do simulado final, você precisa ter concluído
                  pelo menos{" "}
                  <span className="font-semibold">
                    {simuladoData.requiredLists} listas
                  </span>
                  . Você completou{" "}
                  <span className="font-semibold">{completedLists} listas</span>
                  .
                </p>
                <div className="mb-6">
                  <Progress
                    value={(completedLists / simuladoData.requiredLists) * 100}
                    className="h-3"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Faltam {simuladoData.requiredLists - completedLists} listas
                    para liberar o simulado
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/lista-questoes")}
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                  >
                    Resolver Mais Listas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-brand-600" />
                </div>
                <CardTitle className="text-2xl">{simuladoData.title}</CardTitle>
                <p className="text-gray-600">{simuladoData.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Este é um simulado completo que avaliará seu conhecimento em
                    todas as áreas estudadas
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900">60 Minutos</h4>
                    <p className="text-sm text-blue-700">Tempo limite</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-900">
                      {simuladoData.totalQuestions} Questões
                    </h4>
                    <p className="text-sm text-green-700">Múltipla escolha</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-purple-900">
                      {simuladoData.difficulty}
                    </h4>
                    <p className="text-sm text-purple-700">Dificuldade</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Tópicos Cobertos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {simuladoData.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-brand-900 mb-2">
                    Previsão de Desempenho da IA:
                  </h4>
                  <p className="text-brand-800">
                    Com base no seu histórico recente, estimamos que você pode
                    alcançar cerca de{" "}
                    <span className="font-bold">
                      {simuladoData.estimatedScore}%
                    </span>{" "}
                    de aproveitamento.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Instruções Importantes:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Leia cada questão com atenção</li>
                    <li>• Marque apenas uma alternativa por questão</li>
                    <li>• Você pode pausar o simulado uma vez</li>
                    <li>• O tempo será cronometrado rigorosamente</li>
                    <li>• Não é possível voltar após finalizar</li>
                    <li>• Mantenha-se concentrado e calmo</li>
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={handleStartSimulado}
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Simulado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "warning") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Última Confirmação
                </h2>
                <div className="space-y-4 text-left mb-8">
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <strong>ATENÇÃO:</strong> Ao iniciar o simulado, o
                      cronômetro começará imediatamente. Certifique-se de que:
                    </AlertDescription>
                  </Alert>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Você está em um ambiente silencioso</li>
                    <li>✓ Não será interrompido pelos próximos 60 minutos</li>
                    <li>✓ Sua conexão com a internet está estável</li>
                    <li>✓ Você está preparado mentalmente</li>
                  </ul>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setPhase("intro")}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={confirmStart}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Confirmar e Iniciar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "paused") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="py-12">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Pause className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Simulado Pausado
                </h2>
                <p className="text-gray-600 mb-6">
                  Você está na questão {currentQuestion + 1} de{" "}
                  {simuladoQuestions.length}. Tempo restante:{" "}
                  <span className="font-bold">{formatTime(timeRemaining)}</span>
                </p>
                <Alert className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Esta é sua única pausa permitida. O cronômetro continuará
                    rodando em segundo plano.
                  </AlertDescription>
                </Alert>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowExitDialog(true)}
                    className="flex-1"
                  >
                    Abandonar Simulado
                  </Button>
                  <Button
                    onClick={handleResume}
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "completed") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="py-12">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-orange-600 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Tempo Esgotado!
                </h2>
                <p className="text-gray-600 mb-6">
                  O simulado foi finalizado automaticamente. Processando seus
                  resultados...
                </p>
                <Progress value={85} className="w-1/2 mx-auto" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "results") {
    const results = calculateResults();
    const performance = getPerformanceLevel(results.percentage);

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 ${performance.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Target className={`w-8 h-8 ${performance.color}`} />
                </div>
                <CardTitle className="text-2xl">Simulado Concluído!</CardTitle>
                <p className="text-gray-600">
                  Aqui estão seus resultados detalhados
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div
                      className={`text-4xl font-bold ${performance.color} mb-2`}
                    >
                      {results.percentage}%
                    </div>
                    <p className="text-gray-600">Aproveitamento Geral</p>
                    <Badge
                      className={`${performance.bg} ${performance.color} mt-2`}
                    >
                      {performance.level}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success-600 mb-2">
                      {results.correct}
                    </div>
                    <p className="text-gray-600">Questões Corretas</p>
                    <p className="text-sm text-gray-500 mt-1">
                      de {results.total} questões
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {formatTime(results.timeSpent)}
                    </div>
                    <p className="text-gray-600">Tempo Utilizado</p>
                    <p className="text-sm text-gray-500 mt-1">
                      de 60:00 minutos
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-semibold">
                    Performance por Tópico:
                  </h3>
                  {results.topicResults.map((topic) => (
                    <div
                      key={topic.topic}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {topic.topic}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {topic.correct} de {topic.total} questões corretas
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            topic.percentage >= 70
                              ? "text-success-600"
                              : topic.percentage >= 50
                                ? "text-orange-600"
                                : "text-red-600"
                          }`}
                        >
                          {topic.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Alert className="mb-6">
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Análise da IA:</strong> Seu desempenho foi{" "}
                    {results.percentage >= simuladoData.estimatedScore
                      ? "melhor que"
                      : "próximo ao"}{" "}
                    esperado ({simuladoData.estimatedScore}%). Continue
                    praticando os tópicos com menor performance para melhorar
                    ainda mais.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/desempenho")}
                    className="flex-1"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Ver Análise Detalhada
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                  >
                    Voltar ao Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Testing phase
  const question = simuladoQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / simuladoQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Time Warning */}
      {showTimeWarning && (
        <Alert className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 border-red-200 bg-red-50 max-w-md">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>ATENÇÃO:</strong> Restam apenas 5 minutos!
          </AlertDescription>
        </Alert>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {simuladoData.title}
                </h1>
                <p className="text-sm text-gray-600">
                  Questão {currentQuestion + 1} de {simuladoQuestions.length}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center space-x-2 ${
                    timeRemaining <= 300 ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span className="text-lg font-mono font-bold">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handlePause}>
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </Button>
              </div>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-brand-100 text-brand-700">
                      {question.topic}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {question.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {question.question}
                  </h3>

                  <RadioGroup
                    value={selectedAnswer}
                    onValueChange={handleAnswerChange}
                    className="space-y-3"
                  >
                    {question.alternatives.map((alternative) => (
                      <div
                        key={alternative.id}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <RadioGroupItem
                          value={alternative.id}
                          id={alternative.id}
                        />
                        <Label
                          htmlFor={alternative.id}
                          className="flex-1 cursor-pointer"
                        >
                          <span className="font-medium mr-2">
                            {alternative.id.toUpperCase()})
                          </span>
                          {alternative.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Anterior
                    </Button>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={handleNextQuestion}
                        disabled={false}
                      >
                        <SkipForward className="w-4 h-4 mr-2" />
                        Pular
                      </Button>
                      <Button
                        onClick={handleNextQuestion}
                        disabled={!selectedAnswer}
                        className="bg-brand-500 hover:bg-brand-600"
                      >
                        {currentQuestion === simuladoQuestions.length - 1
                          ? "Finalizar"
                          : "Próxima"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-sm">Progresso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {simuladoQuestions.map((_, index) => {
                      const isAnswered = answers[index];
                      const isCurrent = index === currentQuestion;

                      return (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-medium ${
                            isCurrent
                              ? "border-brand-500 bg-brand-100 text-brand-700"
                              : isAnswered
                                ? "border-success-500 bg-success-100 text-success-700"
                                : "border-gray-300 bg-gray-50 text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Respondidas:</span>
                      <span>
                        {Object.keys(answers).length}/{simuladoQuestions.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tempo restante:</span>
                      <span
                        className={
                          timeRemaining <= 300 ? "text-red-600 font-bold" : ""
                        }
                      >
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Exit Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abandonar Simulado?</DialogTitle>
            <DialogDescription>
              Se você sair agora, perderá todo o progresso do simulado. Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowExitDialog(false)}
              className="flex-1"
            >
              Continuar Simulado
            </Button>
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Abandonar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
