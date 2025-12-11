import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Brain,
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Competency descriptions
const competencyDescriptions: Record<string, string> = {
  C1: "Calculo de volume de prismas",
  C2: "Geometria e Cálculo de Áreas",
  C3: "Logaritmos",
  C4: "Funções e Transformações",
  C5: "Cálculo de máximos e mínimos",
  C6: "Permutação com repetição",
  C7: "Geometria Analítica",
  C8: "Estatística e Análise de Dados",
  C14: "Trigonometria",
};

// Mock questions data for the list
const questionsData = [
  {
    id: 1,
    topic: "Trigonometria",
    difficulty: "intermediário",
    competency: "C14",
    question:
      "Em um triângulo retângulo, se o cateto oposto a um ângulo α mede 5 cm e a hipotenusa mede 13 cm, qual é o valor de sen(α)?",
    alternatives: [
      { id: "a", text: "5/13" },
      { id: "b", text: "12/13" },
      { id: "c", text: "5/12" },
      { id: "d", text: "13/5" },
    ],
    correctAnswer: "a",
    explanation:
      "O seno de um ângulo em um triângulo retângulo é a razão entre o cateto oposto e a hipotenusa. Portanto, sen(α) = cateto oposto / hipotenusa = 5/13.",
    tip: "Lembre-se: seno = cateto oposto / hipotenusa, cosseno = cateto adjacente / hipotenusa, tangente = cateto oposto / cateto adjacente.",
  },
  {
    id: 2,
    topic: "Logaritmos",
    difficulty: "intermediário",
    competency: "C3",
    question: "Se log₂(x) = 3, então o valor de x é:",
    alternatives: [
      { id: "a", text: "6" },
      { id: "b", text: "8" },
      { id: "c", text: "9" },
      { id: "d", text: "16" },
    ],
    correctAnswer: "b",
    explanation:
      "Se log₂(x) = 3, significa que 2³ = x. Calculando: 2³ = 2 × 2 × 2 = 8. Portanto, x = 8.",
    tip: "Quando você vê log_a(x) = b, isso significa que a^b = x. É a definição fundamental de logaritmo.",
  },
  {
    id: 3,
    topic: "Funções",
    difficulty: "básico",
    competency: "C4",
    question: "Dada a função f(x) = 3x - 2, qual é o valor de f(4)?",
    alternatives: [
      { id: "a", text: "10" },
      { id: "b", text: "12" },
      { id: "c", text: "14" },
      { id: "d", text: "16" },
    ],
    correctAnswer: "a",
    explanation:
      "Para calcular f(4), substituímos x por 4 na função: f(4) = 3(4) - 2 = 12 - 2 = 10.",
    tip: "Para calcular o valor de uma função em um ponto, simplesmente substitua a variável pelo valor dado.",
  },
];

type QuestionState = "not_answered" | "answered" | "reviewed";

interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
  timeSpent: number;
  state: QuestionState;
}

export default function ResolverQuestoes() {
  const { listaId } = useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showExplanationDetails, setShowExplanationDetails] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [sessionTime, setSessionTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showDuvidaDialog, setShowDuvidaDialog] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Auto-save progress
  useEffect(() => {
    const saveProgress = () => {
      const progress = {
        listaId,
        currentQuestion,
        userAnswers,
        sessionTime,
        timestamp: Date.now(),
      };
      localStorage.setItem(`progress_${listaId}`, JSON.stringify(progress));
    };

    const interval = setInterval(saveProgress, 10000); // Save every 10 seconds
    return () => clearInterval(interval);
  }, [listaId, currentQuestion, userAnswers, sessionTime]);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${listaId}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentQuestion(progress.currentQuestion || 0);
      setUserAnswers(progress.userAnswers || []);
      setSessionTime(progress.sessionTime || 0);
    }
  }, [listaId]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (value: string) => {
    if (!hasAnswered) {
      setSelectedAnswer(value);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const questionStartTime = startTime + currentQuestion * 60000; // Rough estimate
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

    const newAnswer: UserAnswer = {
      questionId: questionsData[currentQuestion].id,
      selectedAnswer,
      timeSpent,
      state: "answered",
    };

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = newAnswer;
    setUserAnswers(updatedAnswers);
    setHasAnswered(true);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setShowExplanationDetails(false);
      setHasAnswered(false);

      // Check if next question was already answered
      if (userAnswers[currentQuestion + 1]) {
        setSelectedAnswer(userAnswers[currentQuestion + 1].selectedAnswer);
        setHasAnswered(true);
        setShowExplanation(true);
      }
    } else {
      completeSession();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
      setShowExplanationDetails(false);
      setHasAnswered(false);

      // Load previous answer if exists
      if (userAnswers[currentQuestion - 1]) {
        setSelectedAnswer(userAnswers[currentQuestion - 1].selectedAnswer);
        setHasAnswered(true);
        setShowExplanation(true);
      } else {
        setSelectedAnswer("");
      }
    }
  };

  const completeSession = () => {
    const finalProgress = {
      listaId,
      userAnswers,
      sessionTime,
      completedAt: Date.now(),
      totalQuestions: questionsData.length,
    };

    localStorage.setItem(`completed_${listaId}`, JSON.stringify(finalProgress));
    localStorage.removeItem(`progress_${listaId}`);
    setIsCompleted(true);
  };

  const calculateResults = () => {
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (
        answer &&
        answer.selectedAnswer === questionsData[index].correctAnswer
      ) {
        correct++;
      }
    });

    return {
      correct,
      total: questionsData.length,
      percentage: Math.round((correct / questionsData.length) * 100),
    };
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    navigate("/lista-questoes");
  };

  const question = questionsData[currentQuestion];
  const progress = ((currentQuestion + 1) / questionsData.length) * 100;
  const currentAnswer = userAnswers[currentQuestion];
  const isCorrect = currentAnswer?.selectedAnswer === question.correctAnswer;

  if (isCompleted) {
    const results = calculateResults();

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
                <CardTitle className="text-2xl">Lista Concluída!</CardTitle>
                <p className="text-gray-600">
                  Parabéns por completar todas as questões
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-600">
                      {results.percentage}%
                    </div>
                    <p className="text-sm text-gray-600">Aproveitamento</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success-600">
                      {results.correct}
                    </div>
                    <p className="text-sm text-gray-600">Acertos</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-600">
                      {formatTime(sessionTime)}
                    </div>
                    <p className="text-sm text-gray-600">Tempo Total</p>
                  </div>
                </div>

                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Próxima recomendação:</strong> Com base no seu
                    desempenho, a IA já está preparando sua próxima lista focada
                    nos tópicos que precisam de mais atenção.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/historico")}
                    className="flex-1"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Ver Análise Detalhada
                  </Button>
                  <Button
                    onClick={() => navigate("/dashboard")}
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={handleExit}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Sair
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Lista Personalizada #47
                  </h1>
                  <p className="text-sm text-gray-600">
                    Questão {currentQuestion + 1} de {questionsData.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-mono text-gray-700">
                    {formatTime(sessionTime)}
                  </span>
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Question Area */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative group">
                        <Badge
                          variant="secondary"
                          className="bg-brand-100 text-brand-700 cursor-help"
                        >
                          {question.competency}
                        </Badge>
                        <div className="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10 pointer-events-none">
                          <p className="font-semibold">{question.competency}</p>
                          <p>{competencyDescriptions[question.competency as keyof typeof competencyDescriptions] || "Descrição não disponível"}</p>
                        </div>
                      </div>
                    </div>
                    <Dialog open={showDuvidaDialog} onOpenChange={setShowDuvidaDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Dúvida
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Dúvida Registrada</DialogTitle>
                        </DialogHeader>
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-success-600" />
                          </div>
                          <p className="text-lg font-semibold text-gray-900 mb-2">
                            Dúvida Enviada!
                          </p>
                          <p className="text-gray-600">
                            O professor recebeu sua dúvida sobre esta questão.
                          </p>
                        </div>
                        <Button
                          onClick={() => setShowDuvidaDialog(false)}
                          className="w-full bg-brand-500 hover:bg-brand-600"
                        >
                          Fechar
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                    {question.question}
                  </h3>

                  <RadioGroup
                    value={selectedAnswer}
                    onValueChange={handleAnswerSelect}
                    className="space-y-3"
                    disabled={hasAnswered}
                  >
                    {question.alternatives.map((alternative) => {
                      let className =
                        "flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors";

                      if (hasAnswered) {
                        if (alternative.id === question.correctAnswer) {
                          className += " bg-success-50 border-success-200";
                        } else if (
                          alternative.id === selectedAnswer &&
                          alternative.id !== question.correctAnswer
                        ) {
                          className += " bg-red-50 border-red-200";
                        } else {
                          className += " bg-gray-50 border-gray-200";
                        }
                      } else {
                        className += " hover:bg-gray-50";
                      }

                      return (
                        <div key={alternative.id} className={className}>
                          <RadioGroupItem
                            value={alternative.id}
                            id={alternative.id}
                            disabled={hasAnswered}
                          />
                          <Label
                            htmlFor={alternative.id}
                            className="flex-1 cursor-pointer flex items-center"
                          >
                            <span className="font-medium mr-3">
                              {alternative.id.toUpperCase()})
                            </span>
                            <span>{alternative.text}</span>
                            {hasAnswered &&
                              alternative.id === question.correctAnswer && (
                                <CheckCircle className="w-5 h-5 text-success-600 ml-auto" />
                              )}
                            {hasAnswered &&
                              alternative.id === selectedAnswer &&
                              alternative.id !== question.correctAnswer && (
                                <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                              )}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {/* Answer Feedback */}
                  {showExplanation && (
                    <div className="space-y-4">
                      <Alert
                        className={
                          isCorrect
                            ? "border-success-200 bg-success-50"
                            : "border-red-200 bg-red-50"
                        }
                      >
                        {isCorrect ? (
                          <CheckCircle className="h-4 w-4 text-success-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <AlertDescription>
                          <strong>
                            {isCorrect ? "Correto!" : "Incorreto"}
                          </strong>
                        </AlertDescription>
                      </Alert>

                      {!isCorrect && !showExplanationDetails && (
                        <Button
                          variant="outline"
                          onClick={() => setShowExplanationDetails(true)}
                          className="w-full"
                        >
                          Ver Resolução
                        </Button>
                      )}

                      {showExplanationDetails && (
                        <div className="space-y-4">
                          <Alert className="border-brand-200 bg-brand-50">
                            <Brain className="h-4 w-4 text-brand-600" />
                            <AlertDescription>
                              <strong>Resolução:</strong> {question.explanation}
                            </AlertDescription>
                          </Alert>

                          <Alert className="border-orange-200 bg-orange-50">
                            <Lightbulb className="h-4 w-4 text-orange-600" />
                            <AlertDescription>
                              <strong>Dica:</strong> {question.tip}
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Anterior
                    </Button>

                    {!hasAnswered ? (
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                        className="bg-brand-500 hover:bg-brand-600"
                      >
                        Confirmar Resposta
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextQuestion}
                        className="bg-brand-500 hover:bg-brand-600"
                      >
                        {currentQuestion === questionsData.length - 1
                          ? "Finalizar Lista"
                          : "Próxima"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar with progress */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Progresso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {questionsData.map((_, index) => {
                      const isAnswered = userAnswers[index];
                      const isCurrent = index === currentQuestion;

                      let className =
                        "w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-medium transition-colors";

                      if (isCurrent) {
                        className +=
                          " border-brand-500 bg-brand-100 text-brand-700";
                      } else if (isAnswered) {
                        const isCorrectAnswer =
                          isAnswered.selectedAnswer ===
                          questionsData[index].correctAnswer;
                        className += isCorrectAnswer
                          ? " border-success-500 bg-success-100 text-success-700"
                          : " border-red-500 bg-red-100 text-red-700";
                      } else {
                        className +=
                          " border-gray-300 bg-gray-50 text-gray-400";
                      }

                      return (
                        <div key={index} className={className}>
                          {index + 1}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Respondidas:</span>
                      <span className="font-medium">
                        {userAnswers.filter(Boolean).length}/
                        {questionsData.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Acertos:</span>
                      <span className="font-medium text-success-600">
                        {
                          userAnswers.filter(
                            (answer, index) =>
                              answer &&
                              answer.selectedAnswer ===
                                questionsData[index].correctAnswer,
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sair da Lista?</DialogTitle>
            <DialogDescription>
              Seu progresso será salvo automaticamente. Você pode continuar de
              onde parou mais tarde.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowExitDialog(false)}
              className="flex-1"
            >
              Continuar
            </Button>
            <Button onClick={confirmExit} className="flex-1">
              Sair
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
