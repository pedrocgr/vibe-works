import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  X,
  BookOpen,
  MapPin,
} from "lucide-react";

// Continents with their competencies - cities positioned INSIDE continent boundaries
const continentsData = [
  {
    id: "geometria",
    name: "Geometria Espacial",
    color: "#3B82F6",
    lightColor: "#DBEAFE",
    darkColor: "#1E40AF",
    displayX: 16, // Center text position for continent name
    displayY: 45,
    cities: [
      { id: "C01", code: "C01", name: "Cálculo de Volume - Prismas", dominance: 3, x: 12, y: 18 },
      { id: "C02", code: "C02", name: "Cálculo de Volume - Cilindros", dominance: 2, x: 20, y: 15 },
      { id: "C03", code: "C03", name: "Cálculo de Volume - Esferas", dominance: 1, x: 28, y: 18 },
      { id: "C04", code: "C04", name: "Área de Superfícies", dominance: 0, x: 24, y: 25 },
      { id: "C05", code: "C05", name: "Simetria em 3D", dominance: 3, x: 16, y: 35 },
      { id: "C06", code: "C06", name: "Teorema de Pitágoras 3D", dominance: 2, x: 25, y: 32 },
      { id: "C07", code: "C07", name: "Secções de Sólidos", dominance: 1, x: 12, y: 50 },
      { id: "C08", code: "C08", name: "Inscrição e Circunscrição", dominance: 0, x: 22, y: 50 },
      { id: "C09", code: "C09", name: "Diedros e Ângulos", dominance: 2, x: 10, y: 35 },
      { id: "C10", code: "C10", name: "Poliedros Regulares", dominance: 3, x: 18, y: 60 },
      { id: "C11", code: "C11", name: "Transformações Geométricas", dominance: 1, x: 12, y: 68 },
      { id: "C12", code: "C12", name: "Coordenadas no Espaço", dominance: 0, x: 8, y: 55 },
    ],
  },
  {
    id: "estatistica",
    name: "Estatística",
    color: "#10B981",
    lightColor: "#D1FAE5",
    darkColor: "#065F46",
    displayX: 75, // Center text position for continent name
    displayY: 45,
    cities: [
      { id: "C13", code: "C13", name: "Média Aritmética", dominance: 3, x: 65, y: 15 },
      { id: "C14", code: "C14", name: "Média Ponderada", dominance: 2, x: 75, y: 12 },
      { id: "C15", code: "C15", name: "Mediana e Moda", dominance: 1, x: 82, y: 18 },
      { id: "C16", code: "C16", name: "Desvio Padrão", dominance: 0, x: 87, y: 28 },
      { id: "C17", code: "C17", name: "Variância", dominance: 3, x: 68, y: 35 },
      { id: "C18", code: "C18", name: "Distribuição Normal", dominance: 2, x: 78, y: 38 },
      { id: "C19", code: "C19", name: "Gráficos e Tabelas", dominance: 1, x: 85, y: 45 },
      { id: "C20", code: "C20", name: "Quartis e Percentis", dominance: 0, x: 72, y: 55 },
      { id: "C21", code: "C21", name: "Correlação e Regressão", dominance: 2, x: 80, y: 58 },
      { id: "C22", code: "C22", name: "Amostragem Estatística", dominance: 3, x: 62, y: 60 },
      { id: "C23", code: "C23", name: "Inferência Estatística", dominance: 1, x: 82, y: 65 },
      { id: "C24", code: "C24", name: "Teste de Hipóteses", dominance: 0, x: 72, y: 70 },
    ],
  },
  {
    id: "funcoes-quadraticas",
    name: "Funções do 2° Grau",
    color: "#A855F7",
    lightColor: "#F3E8FF",
    darkColor: "#6B21A8",
    displayX: 54, // Center text position for continent name
    displayY: 78,
    cities: [
      { id: "C25", code: "C25", name: "Forma Padrão da Parábola", dominance: 3, x: 48, y: 65 },
      { id: "C26", code: "C26", name: "Vértice e Eixo de Simetria", dominance: 2, x: 58, y: 63 },
      { id: "C27", code: "C27", name: "Raízes e Fatores", dominance: 1, x: 52, y: 80 },
      { id: "C28", code: "C28", name: "Completamento de Quadrado", dominance: 0, x: 62, y: 82 },
      { id: "C29", code: "C29", name: "Otimização e Máximos", dominance: 3, x: 42, y: 75 },
      { id: "C30", code: "C30", name: "Inequações Quadráticas", dominance: 2, x: 48, y: 88 },
      { id: "C31", code: "C31", name: "Gráficos de Parábolas", dominance: 1, x: 58, y: 90 },
      { id: "C32", code: "C32", name: "Translação de Funções", dominance: 0, x: 65, y: 78 },
      { id: "C33", code: "C33", name: "Composição de Funções", dominance: 2, x: 45, y: 55 },
      { id: "C34", code: "C34", name: "Função Inversa", dominance: 3, x: 62, y: 68 },
      { id: "C35", code: "C35", name: "Resolução de Problemas", dominance: 1, x: 50, y: 45 },
      { id: "C36", code: "C36", name: "Aplicações em Física", dominance: 0, x: 58, y: 52 },
    ],
  },
  {
    id: "analise-combinatoria",
    name: "Análise Combinatória",
    color: "#F97316",
    lightColor: "#FFEDD5",
    darkColor: "#92400E",
    displayX: 16, // Center text position for continent name
    displayY: 78,
    cities: [
      { id: "C37", code: "C37", name: "Princípio Fundamental da Contagem", dominance: 3, x: 12, y: 75 },
      { id: "C38", code: "C38", name: "Permutação Simples", dominance: 2, x: 22, y: 78 },
      { id: "C39", code: "C39", name: "Permutação com Repetição", dominance: 1, x: 18, y: 88 },
      { id: "C40", code: "C40", name: "Combinação Simples", dominance: 0, x: 28, y: 90 },
      { id: "C41", code: "C41", name: "Arranjo Simples", dominance: 3, x: 8, y: 65 },
      { id: "C42", code: "C42", name: "Binômio de Newton", dominance: 2, x: 15, y: 48 },
      { id: "C43", code: "C43", name: "Número de Combinações", dominance: 1, x: 25, y: 68 },
      { id: "C44", code: "C44", name: "Princípio da Inclusão-Exclusão", dominance: 0, x: 10, y: 35 },
      { id: "C45", code: "C45", name: "Coeficientes Binomiais", dominance: 2, x: 20, y: 38 },
      { id: "C46", code: "C46", name: "Distribuições Combinatórias", dominance: 3, x: 28, y: 18 },
      { id: "C47", code: "C47", name: "Partições e Particionamento", dominance: 1, x: 10, y: 20 },
      { id: "C48", code: "C48", name: "Problemas de Seleção", dominance: 0, x: 18, y: 12 },
    ],
  },
];

// Mock example questions for each competency
const exampleQuestions: Record<string, { title: string; question: string; answer: string }> = {
  C01: {
    title: "Cálculo de Volume - Prismas",
    question: "Um prisma triangular tem base com área de 12 cm² e altura de 5 cm. Qual é o volume do prisma?",
    answer: "Volume = Área da base × altura = 12 × 5 = 60 cm³",
  },
  C14: {
    title: "Média Ponderada",
    question: "Um aluno teve notas 7, 8 e 9 com pesos 2, 3 e 5 respectivamente. Qual é sua média ponderada?",
    answer: "Média = (7×2 + 8×3 + 9×5) / (2+3+5) = (14 + 24 + 45) / 10 = 83 / 10 = 8,3",
  },
  C25: {
    title: "Forma Padrão da Parábola",
    question: "Converta f(x) = 2x² + 8x + 3 para a forma vértice f(x) = a(x-h)² + k",
    answer: "f(x) = 2(x+2)² - 5. Vértice em (-2, -5)",
  },
  C37: {
    title: "Princípio Fundamental da Contagem",
    question: "De quantas maneiras podemos escolher uma refeição com 3 opções de entrada, 4 de prato principal e 2 de sobremesa?",
    answer: "Total = 3 × 4 × 2 = 24 maneiras diferentes",
  },
};

function getDominanceColor(dominance: number) {
  switch (dominance) {
    case 0:
      return "bg-red-500 hover:bg-red-600 text-white";
    case 1:
      return "bg-orange-500 hover:bg-orange-600 text-white";
    case 2:
      return "bg-yellow-500 hover:bg-yellow-600 text-white";
    case 3:
      return "bg-green-500 hover:bg-green-600 text-white";
    default:
      return "bg-gray-400 text-white";
  }
}

function getDominanceLabel(dominance: number) {
  const labels = ["Não Dominado", "Parcialmente Dominado", "Intermediário", "Dominado"];
  return labels[dominance] || "Desconhecido";
}

export default function DesempenhoTopicos() {
  const [selectedCity, setSelectedCity] = useState<{
    code: string;
    name: string;
    dominance: number;
    continent: string;
  } | null>(null);
  const [exampleModalOpen, setExampleModalOpen] = useState(false);
  const [currentExample, setCurrentExample] = useState<any>(null);

  const handleCityClick = (city: any, continentName: string) => {
    setSelectedCity({
      code: city.code,
      name: city.name,
      dominance: city.dominance,
      continent: continentName,
    });
  };

  const handleViewExample = (code: string) => {
    const example = exampleQuestions[code];
    if (example) {
      setCurrentExample(example);
      setExampleModalOpen(true);
    } else {
      // Fallback for competencies without specific examples
      setCurrentExample({
        title: selectedCity?.name,
        question: `Exemplo de questão para a competência ${code}`,
        answer: "Resolução de exemplo mocked",
      });
      setExampleModalOpen(true);
    }
  };

  const mapContainerWidth = 100;
  const mapContainerHeight = 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
              <MapPin className="w-8 h-8 mr-3 text-blue-400" />
              Mapa de Competências
            </h1>
            <p className="text-gray-300 text-lg">
              Navegue pelos continentes e domine cada estilo de questão
            </p>
          </div>

          {/* Legend */}
          <div className="mb-8 bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h3 className="font-semibold text-white mb-4">Níveis de Dominância</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-200">Não Dominado</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-200">Parcialmente Dominado</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-200">Intermediário</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-200">Dominado</span>
              </div>
            </div>
          </div>

          {/* Unified Map Container */}
          <div className="bg-slate-700 rounded-lg shadow-2xl overflow-hidden border-2 border-slate-600 relative">
            {/* SVG Map Background with Continents */}
            <svg viewBox="0 0 100 100" className="w-full block" style={{ minHeight: "600px" }} preserveAspectRatio="xMidYMid meet">
              {/* Ocean background */}
              <defs>
                <pattern id="ocean" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect width="4" height="4" fill="#1e3a8a" />
                  <circle cx="2" cy="2" r="0.5" fill="#3b82f6" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="#0f172a" />
              <rect width="100" height="100" fill="url(#ocean)" opacity="0.4" />

              {/* Continent: Análise Combinatória (Southwest) */}
              <path
                d="M 5,60 Q 10,55 15,60 Q 12,65 8,70 Q 3,75 5,85 Q 8,88 12,85 Q 18,90 22,85 Q 20,75 15,70 Q 10,65 5,60 Z"
                fill="#F97316"
                opacity="0.85"
                stroke="#92400E"
                strokeWidth="0.8"
              />

              {/* Continent: Geometria Espacial (Northwest) */}
              <path
                d="M 5,15 Q 12,10 20,12 Q 28,15 32,20 Q 35,28 32,35 Q 28,40 20,38 Q 12,40 8,35 Q 5,28 5,20 Z"
                fill="#3B82F6"
                opacity="0.85"
                stroke="#1E40AF"
                strokeWidth="0.8"
              />

              {/* Continent: Funções do 2° Grau (South Central) */}
              <path
                d="M 40,60 Q 50,55 60,60 Q 68,65 70,75 Q 68,88 58,92 Q 48,95 42,88 Q 38,80 40,70 Z"
                fill="#A855F7"
                opacity="0.85"
                stroke="#6B21A8"
                strokeWidth="0.8"
              />

              {/* Continent: Estatística (East) */}
              <path
                d="M 60,10 Q 75,12 88,18 Q 92,25 90,35 Q 88,48 82,58 Q 78,65 70,68 Q 62,62 60,50 Q 58,35 60,20 Z"
                fill="#10B981"
                opacity="0.85"
                stroke="#065F46"
                strokeWidth="0.8"
              />

              {/* Continent Names - inside each continent */}
              <text
                x="16"
                y="42"
                textAnchor="middle"
                fontSize="3.2"
                fontWeight="bold"
                fill="white"
                opacity="0.8"
                pointerEvents="none"
              >
                Geometria
              </text>
              <text
                x="16"
                y="48"
                textAnchor="middle"
                fontSize="3.2"
                fontWeight="bold"
                fill="white"
                opacity="0.8"
                pointerEvents="none"
              >
                Espacial
              </text>

              <text
                x="76"
                y="42"
                textAnchor="middle"
                fontSize="3.2"
                fontWeight="bold"
                fill="white"
                opacity="0.8"
                pointerEvents="none"
              >
                Estatística
              </text>

              <text
                x="54"
                y="76"
                textAnchor="middle"
                fontSize="3"
                fontWeight="bold"
                fill="white"
                opacity="0.8"
                pointerEvents="none"
              >
                Funções 2°
              </text>

              <text
                x="16"
                y="76"
                textAnchor="middle"
                fontSize="2.8"
                fontWeight="bold"
                fill="white"
                opacity="0.8"
                pointerEvents="none"
              >
                Análise
              </text>
              <text
                x="16"
                y="81"
                textAnchor="middle"
                fontSize="2.8"
                fontWeight="bold"
                fill="white"
                opacity="0.8"
                pointerEvents="none"
              >
                Combinatória
              </text>
            </svg>

            {/* Overlay with interactive city buttons */}
            <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
              {continentsData.map((continent) =>
                continent.cities.map((city) => {
                  // Calculate position based on SVG viewBox (100x100) to screen coordinates
                  const svgContainer = document.querySelector('svg[viewBox="0 0 100 100"]') as SVGElement;
                  
                  return (
                    <button
                      key={city.id}
                      onClick={() => handleCityClick(city, continent.name)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-bold text-xs transition-all hover:scale-125 shadow-lg hover:shadow-xl border-2 border-white border-opacity-60 ${getDominanceColor(city.dominance)}`}
                      style={{
                        left: `${city.x}%`,
                        top: `${city.y}%`,
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                      }}
                      title={`${city.code} - ${city.name}`}
                    >
                      {city.dominance}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Continents Legend */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {continentsData.map((continent) => (
              <div
                key={continent.id}
                className="rounded-lg p-4 border-2 transition-all hover:shadow-lg"
                style={{
                  backgroundColor: continent.lightColor,
                  borderColor: continent.color,
                }}
              >
                <h3
                  className="font-semibold text-sm mb-2"
                  style={{ color: continent.darkColor }}
                >
                  {continent.name}
                </h3>
                <p className="text-xs opacity-70" style={{ color: continent.darkColor }}>
                  {continent.cities.length} estilos de questão
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* City Details Modal */}
      <Dialog open={!!selectedCity} onOpenChange={(open) => !open && setSelectedCity(null)}>
        <DialogContent className="max-w-md bg-slate-800 border-slate-700">
          <div className="flex items-start justify-between">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                Competência
              </DialogTitle>
            </DialogHeader>
            <button
              onClick={() => setSelectedCity(null)}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {selectedCity && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Continente</p>
                <p className="text-lg font-semibold text-white">{selectedCity.continent}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Código</p>
                <p className="text-lg font-bold text-blue-400">{selectedCity.code}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Estilo de Questão</p>
                <p className="text-lg font-semibold text-white">{selectedCity.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Nível de Dominância</p>
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full ${getDominanceColor(selectedCity.dominance).split(" ")[0]}`}></div>
                  <span className="font-medium text-white">{getDominanceLabel(selectedCity.dominance)}</span>
                </div>
              </div>

              <Button
                onClick={() => handleViewExample(selectedCity.code)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Ver Exemplo de Questão
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Example Question Modal */}
      <Dialog open={exampleModalOpen} onOpenChange={setExampleModalOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <DialogHeader>
              <DialogTitle className="text-white">{currentExample?.title}</DialogTitle>
            </DialogHeader>
            <button
              onClick={() => setExampleModalOpen(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {currentExample && (
            <div className="space-y-6">
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Enunciado:</h4>
                <p className="text-gray-200 leading-relaxed">{currentExample.question}</p>
              </div>

              <div className="bg-green-950 rounded-lg p-4 border border-green-800">
                <h4 className="font-semibold text-green-200 mb-2">Resolução:</h4>
                <p className="text-green-100 leading-relaxed font-mono whitespace-pre-wrap">{currentExample.answer}</p>
              </div>

              <Button
                onClick={() => setExampleModalOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Voltar ao Mapa
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
