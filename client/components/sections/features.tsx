import {
  Brain,
  Target,
  BarChart3,
  Clock,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "IA Personalizada",
      description:
        "Algoritmo inteligente que aprende com seus erros e acertos para recomendar as questões ideais para você.",
      color: "text-brand-600",
      bgColor: "bg-brand-100",
    },
    {
      icon: Target,
      title: "Diagnóstico Inicial",
      description:
        "Teste completo para identificar suas lacunas de conhecimento e criar seu perfil de estudos personalizado.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: BarChart3,
      title: "Mapa de competências",
      description:
        "Acompanhe sua evolução e identifique pontos de evolução e veja seu progresso em tempo real.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      icon: Clock,
      title: "Listas Diárias",
      description:
        "Questões personalizadas entregues todos os dias baseadas no seu histórico e objetivos de estudo.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: BookOpen,
      title: "Feedback Imediato",
      description:
        "Correção automática com explicações detalhadas para acelerar seu aprendizado e fixar conceitos.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="features-section">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Como o MentorIA{" "}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              revoluciona o estudo de matemática
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Nossa plataforma combina inteligência artificial avançada com
            metodologias comprovadas para maximizar seu desempenho nos
            vestibulares mais concorridos do país.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <Brain className="w-5 h-5 mr-2" />
            Experimente Grátis por 7 Dias
          </div>
        </div>
      </div>
    </section>
  );
}
