import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Brain,
  CheckCircle,
  Clock,
  Play,
  Upload,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

// Mock data for diagnostic questions - 20 questions
const diagnosticQuestions = [
  {
    id: 1,
    question: "Qual é o valor de x na equação 2x + 5 = 17?",
    alternatives: [
      { id: "a", text: "x = 5" },
      { id: "b", text: "x = 6" },
      { id: "c", text: "x = 7" },
      { id: "d", text: "x = 8" },
    ],
    correctAnswer: "b",
    competency: "C1",
  },
  {
    id: 2,
    question: "A área de um triângulo com base 10 cm e altura 6 cm é:",
    alternatives: [
      { id: "a", text: "30 cm²" },
      { id: "b", text: "60 cm²" },
      { id: "c", text: "16 cm²" },
      { id: "d", text: "45 cm²" },
    ],
    correctAnswer: "a",
    competency: "C2",
  },
  {
    id: 3,
    question: "Qual é o valor de sen(30°)?",
    alternatives: [
      { id: "a", text: "1/2" },
      { id: "b", text: "√3/2" },
      { id: "c", text: "1" },
      { id: "d", text: "√2/2" },
    ],
    correctAnswer: "a",
    competency: "C14",
  },
  {
    id: 4,
    question: "log₂(8) é igual a:",
    alternatives: [
      { id: "a", text: "2" },
      { id: "b", text: "3" },
      { id: "c", text: "4" },
      { id: "d", text: "8" },
    ],
    correctAnswer: "b",
    competency: "C3",
  },
  {
    id: 5,
    question: "Se f(x) = 2x + 1, então f(3) é:",
    alternatives: [
      { id: "a", text: "6" },
      { id: "b", text: "7" },
      { id: "c", text: "8" },
      { id: "d", text: "9" },
    ],
    correctAnswer: "b",
    competency: "C4",
  },
  {
    id: 6,
    question: "Qual é a derivada de f(x) = x²?",
    alternatives: [
      { id: "a", text: "x" },
      { id: "b", text: "2x" },
      { id: "c", text: "x²" },
      { id: "d", text: "2" },
    ],
    correctAnswer: "b",
    competency: "C5",
  },
  {
    id: 7,
    question: "Quantas permutações existem de 3 elementos?",
    alternatives: [
      { id: "a", text: "3" },
      { id: "b", text: "6" },
      { id: "c", text: "9" },
      { id: "d", text: "27" },
    ],
    correctAnswer: "b",
    competency: "C6",
  },
  {
    id: 8,
    question: "A soma dos ângulos internos de um quadrilátero é:",
    alternatives: [
      { id: "a", text: "180°" },
      { id: "b", text: "270°" },
      { id: "c", text: "360°" },
      { id: "d", text: "540°" },
    ],
    correctAnswer: "c",
    competency: "C7",
  },
  {
    id: 9,
    question: "Qual é a mediana de {2, 4, 6, 8, 10}?",
    alternatives: [
      { id: "a", text: "4" },
      { id: "b", text: "6" },
      { id: "c", text: "8" },
      { id: "d", text: "5" },
    ],
    correctAnswer: "b",
    competency: "C8",
  },
  {
    id: 10,
    question: "Se cos(θ) = 0.5, qual é o valor de θ em graus?",
    alternatives: [
      { id: "a", text: "30°" },
      { id: "b", text: "45°" },
      { id: "c", text: "60°" },
      { id: "d", text: "90°" },
    ],
    correctAnswer: "c",
    competency: "C14",
  },
  {
    id: 11,
    question: "Qual é o resultado de (a + b)²?",
    alternatives: [
      { id: "a", text: "a² + b²" },
      { id: "b", text: "a² + 2ab + b²" },
      { id: "c", text: "a² - b²" },
      { id: "d", text: "2a + 2b" },
    ],
    correctAnswer: "b",
    competency: "C1",
  },
  {
    id: 12,
    question: "Quantos lados tem um hexágono?",
    alternatives: [
      { id: "a", text: "4" },
      { id: "b", text: "5" },
      { id: "c", text: "6" },
      { id: "d", text: "8" },
    ],
    correctAnswer: "c",
    competency: "C2",
  },
  {
    id: 13,
    question: "A média de {10, 20, 30, 40} é:",
    alternatives: [
      { id: "a", text: "20" },
      { id: "b", text: "25" },
      { id: "c", text: "30" },
      { id: "d", text: "35" },
    ],
    correctAnswer: "b",
    competency: "C8",
  },
  {
    id: 14,
    question: "Qual é a solução de 3x - 2 = 10?",
    alternatives: [
      { id: "a", text: "x = 2" },
      { id: "b", text: "x = 3" },
      { id: "c", text: "x = 4" },
      { id: "d", text: "x = 5" },
    ],
    correctAnswer: "c",
    competency: "C1",
  },
  {
    id: 15,
    question: "A circunferência de um círculo com raio 5 é:",
    alternatives: [
      { id: "a", text: "5π" },
      { id: "b", text: "10π" },
      { id: "c", text: "25π" },
      { id: "d", text: "100π" },
    ],
    correctAnswer: "b",
    competency: "C2",
  },
  {
    id: 16,
    question: "Qual é a combinação de 5 elementos tomados 2 a 2?",
    alternatives: [
      { id: "a", text: "10" },
      { id: "b", text: "15" },
      { id: "c", text: "20" },
      { id: "d", text: "25" },
    ],
    correctAnswer: "a",
    competency: "C6",
  },
  {
    id: 17,
    question: "Qual é a tangente de 45°?",
    alternatives: [
      { id: "a", text: "0" },
      { id: "b", text: "0.5" },
      { id: "c", text: "1" },
      { id: "d", text: "√3" },
    ],
    correctAnswer: "c",
    competency: "C14",
  },
  {
    id: 18,
    question: "O valor de 2⁵ é:",
    alternatives: [
      { id: "a", text: "10" },
      { id: "b", text: "25" },
      { id: "c", text: "32" },
      { id: "d", text: "64" },
    ],
    correctAnswer: "c",
    competency: "C1",
  },
  {
    id: 19,
    question: "Qual é a moda de {1, 2, 2, 3, 3, 3, 4}?",
    alternatives: [
      { id: "a", text: "2" },
      { id: "b", text: "3" },
      { id: "c", text: "2.5" },
      { id: "d", text: "1" },
    ],
    correctAnswer: "b",
    competency: "C8",
  },
  {
    id: 20,
    question: "A área de um quadrado com lado 7 cm é:",
    alternatives: [
      { id: "a", text: "28 cm²" },
      { id: "b", text: "49 cm²" },
      { id: "c", text: "14 cm²" },
      { id: "d", text: "56 cm²" },
    ],
    correctAnswer: "b",
    competency: "C2",
  },
];

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

type TestPhase = "intro" | "testing" | "completed" | "results" | "gabarito";

export default function DiagnosticoInicial() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<TestPhase>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer effect
  useEffect(() => {
    if (phase === "testing" && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && phase === "testing") {
      handleTimeUp();
    }
  }, [timeRemaining, phase]);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("diagnosticState");
    if (saved) {
      const { currentQuestion: savedQuestion, answers: savedAnswers, timeRemaining: savedTime } = JSON.parse(saved);
      setCurrentQuestion(savedQuestion);
      setAnswers(savedAnswers);
      setTimeRemaining(savedTime);
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (phase === "testing") {
      localStorage.setItem("diagnosticState", JSON.stringify({ currentQuestion, answers, timeRemaining }));
    }
  }, [currentQuestion, answers, timeRemaining, phase]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStartTest = () => {
    setPhase("testing");
  };

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
      setSelectedAnswer("");

      if (currentQuestion < diagnosticQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishTest();
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const handleTimeUp = () => {
    setPhase("completed");
    setTimeout(() => {
      finishTest();
    }, 2000);
  };

  const finishTest = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Calculate results
    const results = calculateResults();
    localStorage.setItem("diagnosticResults", JSON.stringify(results));
    localStorage.setItem("hasCompletedDiagnostic", "true");
    localStorage.removeItem("diagnosticState");

    setPhase("results");
    setIsSubmitting(false);
  };

  const calculateResults = () => {
    const competencyScores: Record<string, { correct: number; total: number }> = {};

    diagnosticQuestions.forEach((question, index) => {
      const competency = question.competency;
      if (!competencyScores[competency]) {
        competencyScores[competency] = { correct: 0, total: 0 };
      }
      competencyScores[competency].total++;

      if (answers[index] === question.correctAnswer) {
        competencyScores[competency].correct++;
      }
    });

    return Object.entries(competencyScores).map(([competency, scores]) => ({
      competency,
      percentage: Math.round((scores.correct / scores.total) * 100),
      correct: scores.correct,
      total: scores.total,
    }));
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-brand-600" />
                </div>
                <CardTitle className="text-2xl">Diagnóstico Inicial</CardTitle>
                <p className="text-gray-600">
                  Vamos identificar seu nível atual e áreas de melhoria
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Este teste diagnóstico irá nos ajudar a personalizar sua
                    experiência de estudos
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-900">1 Hora</h4>
                    <p className="text-sm text-blue-700">Tempo limite</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-900">20 Questões</h4>
                    <p className="text-sm text-green-700">Múltipla escolha</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Upload className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-purple-900">Opcional</h4>
                    <p className="text-sm text-purple-700">Você pode colocar o gabarito do seu Enem 2025</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Instruções:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Leia cada questão com atenção</li>
                    <li>• Marque apenas uma alternativa por questão</li>
                    <li>• Você pode voltar para questões anteriores</li>
                    <li>• O teste será salvo automaticamente</li>
                    <li>• Responda com base no seu conhecimento atual</li>
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setPhase("gabarito")}
                    className="flex-1"
                  >
                    Coloque seu gabarito de matemática do Enem 2025
                  </Button>
                  <Button
                    onClick={handleStartTest}
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Teste
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "gabarito") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-brand-600" />
                </div>
                <CardTitle className="text-2xl">Carregar Gabarito do ENEM 2025</CardTitle>
                <p className="text-gray-600">
                  Carregue sua resposta do ENEM 2025 para gerar um diagnóstico rápido
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Envie seu gabarito para que nossa IA analise suas competências em matemática
                  </AlertDescription>
                </Alert>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Clique para selecionar ou arraste a imagem</h4>
                  <p className="text-sm text-gray-600">PNG, JPG até 10MB</p>
                  <input type="file" accept="image/*" className="hidden" />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setPhase("intro")}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => {
                      // Simulate gabarito processing
                      const mockResults = [
                        { competency: "C1", percentage: 85, correct: 3, total: 3 },
                        { competency: "C2", percentage: 75, correct: 3, total: 4 },
                        { competency: "C6", percentage: 100, correct: 2, total: 2 },
                        { competency: "C8", percentage: 50, correct: 1, total: 2 },
                        { competency: "C14", percentage: 67, correct: 2, total: 3 },
                      ];
                      localStorage.setItem("diagnosticResults", JSON.stringify(mockResults));
                      localStorage.setItem("hasCompletedDiagnostic", "true");
                      setPhase("results");
                    }}
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                  >
                    Processar Gabarito
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "testing") {
    const question = diagnosticQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / diagnosticQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Progress Header */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Questão {currentQuestion + 1} de {diagnosticQuestions.length}
                </span>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-mono text-gray-700">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card>
              <CardContent className="space-y-6 pt-6">
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
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="bg-brand-500 hover:bg-brand-600"
                  >
                    {currentQuestion === diagnosticQuestions.length - 1
                      ? "Finalizar"
                      : "Próxima"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "completed" || isSubmitting) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="py-12">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-brand-600 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Processando Resultados...
                </h2>
                <p className="text-gray-600 mb-6">
                  Nossa IA está analisando suas respostas para criar seu perfil
                  personalizado
                </p>
                <Progress value={75} className="w-1/2 mx-auto" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "results") {
    const results = calculateResults();
    const overallScore = Math.round(
      results.reduce((acc, r) => acc + r.percentage, 0) / results.length,
    );
    
    // Calculate dominance index
    const dominanceLevels = {
      0: results.filter(r => r.percentage < 25).length,
      1: results.filter(r => r.percentage >= 25 && r.percentage < 50).length,
      2: results.filter(r => r.percentage >= 50 && r.percentage < 75).length,
      3: results.filter(r => r.percentage >= 75).length,
    };
    const totalCompetencies = results.length;
    const dominancePercentage = Math.round((dominanceLevels[3] / totalCompetencies) * 100);

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
                <CardTitle className="text-2xl">
                  Diagnóstico Concluído!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-brand-600 mb-2">
                    {overallScore}%
                  </div>
                  <p className="text-gray-600">Performance Geral</p>
                </div>

                {/* Competencies with hover descriptions */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Competências Identificadas:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {results.map((result) => (
                      <div
                        key={result.competency}
                        className="relative group p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-brand-500 cursor-pointer transition-colors"
                      >
                        <p className="font-semibold text-brand-600 text-center">{result.competency}</p>
                        <p className="text-xs text-gray-600 text-center">{result.percentage}%</p>
                        
                        {/* Hover tooltip */}
                        <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 z-10 pointer-events-none">
                          <p className="font-semibold">{result.competency}</p>
                          <p>{competencyDescriptions[result.competency as keyof typeof competencyDescriptions] || "Descrição não disponível"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dominance Index */}
                <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Índice de Dominância dos Estilos:</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Totalmente Dominado</span>
                        <span className="text-sm font-semibold text-brand-600">{dominancePercentage}%</span>
                      </div>
                      <Progress value={dominancePercentage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Não Dominado</span>
                        <span className="text-sm font-semibold text-red-600">{100 - dominancePercentage}%</span>
                      </div>
                      <Progress value={100 - dominancePercentage} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* View Gabarito and Answer Details */}
                <Alert className="mb-6">
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    Você pode ver o gabarito das questões e o índice de dominância dos estilos para cada competência.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4">
                  <Button
                    onClick={goToDashboard}
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                  >
                    Ir para Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
