import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Clock, Brain } from "lucide-react";

export default function Simulados() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Simulados</h1>
            <p className="text-gray-600 text-lg">
              Os simulados finais estarão disponíveis em breve. Prepare-se para
              testar todo seu conhecimento em condições reais de prova.
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Brain className="w-5 h-5 mr-2" />
                Em Desenvolvimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Previsão: 3 semanas
                  </div>
                </div>
                <p className="text-gray-600">
                  Funcionalidades que estarão disponíveis:
                </p>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>• Simulados completos cronometrados</li>
                  <li>• Diferentes níveis de dificuldade</li>
                  <li>• Análise detalhada de performance</li>
                  <li>• Comparação com outros estudantes</li>
                  <li>• Relatórios de evolução temporal</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Button className="bg-brand-500 hover:bg-brand-600" asChild>
            <a href="/dashboard">Voltar ao Dashboard</a>
          </Button>
        </div>
      </main>
    </div>
  );
}
