import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  BarChart3,
  Eye,
  RotateCcw,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock historic questions data
const historicQuestions = [
  {
    id: 1,
    question: "Qual é o valor de x na equação 2x + 5 = 17?",
    topic: "Álgebra",
    difficulty: "básico",
    userAnswer: "b",
    correctAnswer: "b",
    isCorrect: true,
    timeSpent: 85,
    date: "2024-01-15",
    listId: "lista-47",
    alternatives: [
      { id: "a", text: "x = 5" },
      { id: "b", text: "x = 6" },
      { id: "c", text: "x = 7" },
      { id: "d", text: "x = 8" },
    ],
    explanation:
      "Para resolver 2x + 5 = 17, subtraímos 5 dos dois lados: 2x = 12, então x = 6.",
  },
  {
    id: 2,
    question:
      "Em um triângulo retângulo, se o cateto oposto a um ângulo α mede 5 cm e a hipotenusa mede 13 cm, qual é o valor de sen(α)?",
    topic: "Trigonometria",
    difficulty: "intermediário",
    userAnswer: "c",
    correctAnswer: "a",
    isCorrect: false,
    timeSpent: 142,
    date: "2024-01-15",
    listId: "lista-47",
    alternatives: [
      { id: "a", text: "5/13" },
      { id: "b", text: "12/13" },
      { id: "c", text: "5/12" },
      { id: "d", text: "13/5" },
    ],
    explanation:
      "O seno de um ângulo em um triângulo retângulo é a razão entre o cateto oposto e a hipotenusa. Portanto, sen(α) = 5/13.",
  },
  {
    id: 3,
    question: "Se log₂(x) = 3, então o valor de x é:",
    topic: "Logaritmos",
    difficulty: "intermediário",
    userAnswer: "b",
    correctAnswer: "b",
    isCorrect: true,
    timeSpent: 156,
    date: "2024-01-14",
    listId: "lista-46",
    alternatives: [
      { id: "a", text: "6" },
      { id: "b", text: "8" },
      { id: "c", text: "9" },
      { id: "d", text: "16" },
    ],
    explanation:
      "Se log₂(x) = 3, significa que 2³ = x. Calculando: 2³ = 8. Portanto, x = 8.",
  },
  {
    id: 4,
    question: "A área de um triângulo com base 10 cm e altura 6 cm é:",
    topic: "Geometria",
    difficulty: "básico",
    userAnswer: "a",
    correctAnswer: "a",
    isCorrect: true,
    timeSpent: 67,
    date: "2024-01-14",
    listId: "lista-46",
    alternatives: [
      { id: "a", text: "30 cm²" },
      { id: "b", text: "60 cm²" },
      { id: "c", text: "16 cm²" },
      { id: "d", text: "45 cm²" },
    ],
    explanation:
      "A área do triângulo é calculada por: Área = (base × altura) / 2 = (10 × 6) / 2 = 30 cm².",
  },
  {
    id: 5,
    question: "Dada a função f(x) = 3x - 2, qual é o valor de f(4)?",
    topic: "Funções",
    difficulty: "básico",
    userAnswer: "d",
    correctAnswer: "a",
    isCorrect: false,
    timeSpent: 98,
    date: "2024-01-13",
    listId: "lista-45",
    alternatives: [
      { id: "a", text: "10" },
      { id: "b", text: "12" },
      { id: "c", text: "14" },
      { id: "d", text: "16" },
    ],
    explanation:
      "Para calcular f(4), substituímos x por 4: f(4) = 3(4) - 2 = 12 - 2 = 10.",
  },
  // Add more questions for pagination...
];

const topics = [
  "Todos",
  "Álgebra",
  "Geometria",
  "Trigonometria",
  "Logaritmos",
  "Funções",
];

const difficulties = ["Todas", "básico", "intermediário", "avançado"];

const resultTypes = ["Todos", "Corretas", "Incorretas"];

export default function HistoricoQuestoes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas");
  const [selectedResult, setSelectedResult] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const itemsPerPage = 5;

  // Filter questions based on search and filters
  const filteredQuestions = historicQuestions.filter((question) => {
    const matchesSearch = question.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTopic =
      selectedTopic === "Todos" || question.topic === selectedTopic;
    const matchesDifficulty =
      selectedDifficulty === "Todas" ||
      question.difficulty === selectedDifficulty;
    const matchesResult =
      selectedResult === "Todos" ||
      (selectedResult === "Corretas" && question.isCorrect) ||
      (selectedResult === "Incorretas" && !question.isCorrect);

    return matchesSearch && matchesTopic && matchesDifficulty && matchesResult;
  });

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getResultBadge = (isCorrect: boolean) => {
    return isCorrect ? (
      <Badge className="bg-success-100 text-success-700 hover:bg-success-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Correta
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
        <XCircle className="w-3 h-3 mr-1" />
        Incorreta
      </Badge>
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTopic("Todos");
    setSelectedDifficulty("Todas");
    setSelectedResult("Todos");
    setCurrentPage(1);
  };

  const stats = {
    total: historicQuestions.length,
    correct: historicQuestions.filter((q) => q.isCorrect).length,
    incorrect: historicQuestions.filter((q) => !q.isCorrect).length,
    percentage: Math.round(
      (historicQuestions.filter((q) => q.isCorrect).length /
        historicQuestions.length) *
        100,
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Histórico de Questões
            </h1>
            <p className="text-gray-600">
              Revise todas as questões que você já resolveu e acompanhe sua
              evolução
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </div>
                  <p className="text-sm text-gray-600">Total de Questões</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-600">
                    {stats.correct}
                  </div>
                  <p className="text-sm text-gray-600">Acertos</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {stats.incorrect}
                  </div>
                  <p className="text-sm text-gray-600">Erros</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">
                    {stats.percentage}%
                  </div>
                  <p className="text-sm text-gray-600">Aproveitamento</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="search">Buscar questão</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Digite aqui..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="topic">Tópico</Label>
                  <Select
                    value={selectedTopic}
                    onValueChange={setSelectedTopic}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Dificuldade</Label>
                  <Select
                    value={selectedDifficulty}
                    onValueChange={setSelectedDifficulty}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="result">Resultado</Label>
                  <Select
                    value={selectedResult}
                    onValueChange={setSelectedResult}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resultTypes.map((result) => (
                        <SelectItem key={result} value={result}>
                          {result}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Limpar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Questões ({filteredQuestions.length})
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/desempenho")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Análise
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {paginatedQuestions.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Nenhuma questão encontrada
                  </h3>
                  <p className="text-gray-500">
                    Tente ajustar os filtros ou faça mais listas para ter
                    questões no histórico.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedQuestions.map((question) => (
                    <div
                      key={question.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge
                              variant="secondary"
                              className="bg-brand-100 text-brand-700"
                            >
                              {question.topic}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {question.difficulty}
                            </Badge>
                            {getResultBadge(question.isCorrect)}
                          </div>
                          <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                            {question.question}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(question.date)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatTime(question.timeSpent)}
                            </div>
                            <span className="text-xs">
                              Lista #{question.listId.split("-")[1]}
                            </span>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedQuestion(question)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detalhes da Questão</DialogTitle>
                              <DialogDescription>
                                Revise sua resposta e a explicação completa
                              </DialogDescription>
                            </DialogHeader>
                            {selectedQuestion && (
                              <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                  <Badge className="bg-brand-100 text-brand-700">
                                    {selectedQuestion.topic}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="capitalize"
                                  >
                                    {selectedQuestion.difficulty}
                                  </Badge>
                                  {getResultBadge(selectedQuestion.isCorrect)}
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3">
                                    {selectedQuestion.question}
                                  </h4>
                                  <div className="space-y-2">
                                    {selectedQuestion.alternatives.map(
                                      (alt: any) => (
                                        <div
                                          key={alt.id}
                                          className={`p-3 border rounded-lg ${
                                            alt.id ===
                                            selectedQuestion.correctAnswer
                                              ? "bg-success-50 border-success-200"
                                              : alt.id ===
                                                    selectedQuestion.userAnswer &&
                                                  alt.id !==
                                                    selectedQuestion.correctAnswer
                                                ? "bg-red-50 border-red-200"
                                                : "bg-gray-50"
                                          }`}
                                        >
                                          <div className="flex items-center justify-between">
                                            <span>
                                              <strong>
                                                {alt.id.toUpperCase()})
                                              </strong>{" "}
                                              {alt.text}
                                            </span>
                                            {alt.id ===
                                              selectedQuestion.correctAnswer && (
                                              <CheckCircle className="w-4 h-4 text-success-600" />
                                            )}
                                            {alt.id ===
                                              selectedQuestion.userAnswer &&
                                              alt.id !==
                                                selectedQuestion.correctAnswer && (
                                                <XCircle className="w-4 h-4 text-red-600" />
                                              )}
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>

                                <div className="bg-brand-50 p-4 rounded-lg">
                                  <h5 className="font-semibold text-brand-900 mb-2">
                                    Explicação:
                                  </h5>
                                  <p className="text-brand-800 text-sm">
                                    {selectedQuestion.explanation}
                                  </p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ),
                      )}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1),
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
