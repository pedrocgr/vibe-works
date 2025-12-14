import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Brain, Target, BarChart3, CheckCircle, Zap, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "IA Personalizada",
      description: "Algoritmo inteligente que se adapta ao seu estilo e ritmo de aprendizado",
    },
    {
      icon: Target,
      title: "Diagnóstico Inicial",
      description: "Avaliação completa das suas fraquezas para focar no que importa",
    },
    {
      icon: BarChart3,
      title: "Mapa de competências",
      description: "Acompanhe seu progresso em cada tópico de matemática",
    },
    {
      icon: CheckCircle,
      title: "Listas Diárias",
      description: "Questões selecionadas todos os dias baseadas no seu desempenho",
    },
    {
      icon: Zap,
      title: "Feedback Imediato",
      description: "Respostas instantâneas com explicações detalhadas",
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Conecte-se com outros estudantes e compartilhe dúvidas",
    },
  ];

  return (
    <section id="features-section" className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Recursos Poderosos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo o que você precisa para se preparar para o ENEM com eficiência
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-brand-100 rounded-lg">
                      <Icon className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
