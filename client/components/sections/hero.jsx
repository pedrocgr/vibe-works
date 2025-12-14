import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import { ArrowRight, Brain } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50/30 py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Seu mentor de{" "}
            <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              matemática para o enem
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Trilhas de questões no enem selecionadas individualmente para você
            todos os dias baseado no seu desempenho. Estudo com eficiência e
            foco no que precisa para aprovação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 text-lg"
              asChild
            >
              <Link to="/register">
                Começar Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-brand-200 text-brand-700 hover:bg-brand-50"
              onClick={() => {
                document
                  .getElementById("features-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver Recursos
            </Button>
          </div>

          <div className="flex justify-center gap-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-600">1000+</p>
              <p className="text-gray-600">Questões</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-600">5k+</p>
              <p className="text-gray-600">Alunos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-600">IA</p>
              <p className="text-gray-600">Personalizada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
