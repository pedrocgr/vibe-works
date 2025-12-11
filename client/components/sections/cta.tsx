import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

export function CTASection() {
  const benefits = [
    "Diagnóstico completo em 30 minutos",
    "Primeiras questões personalizadas no mesmo dia",
    "Analytics detalhados da sua evolução",
    "Suporte dedicado durante todo o período",
    "Sem compromisso - cancele quando quiser",
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl transform -translate-x-48 translate-y-48"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Pronto para <span className="text-brand-100">Destravar</span> Seu
            Potencial?
          </h2>

          <p className="text-xl md:text-2xl text-brand-100 mb-8 leading-relaxed">
            Junte-se a milhares de estudantes que já melhoraram suas notas com
            nossa IA personalizada. Comece seu teste gratuito hoje mesmo.
          </p>

          {/* Benefits list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-left">
                <CheckCircle className="w-5 h-5 text-brand-200 mr-3 flex-shrink-0" />
                <span className="text-brand-100">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-brand-600 hover:bg-brand-50 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link to="/dashboard">
                Começar Teste Grátis Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-brand-200 text-brand-100 hover:bg-brand-600/20 hover:border-brand-100"
            >
              Falar com Consultor
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="text-center">
            <p className="text-brand-200 text-sm mb-4">
              Mais de 1000 estudantes já confiam no DestravAI
            </p>
            <div className="flex justify-center items-center space-x-6 opacity-70">
              <div className="text-brand-200 text-sm">⭐⭐⭐⭐⭐</div>
              <div className="text-brand-200 text-sm">4.9/5 nos reviews</div>
              <div className="text-brand-200 text-sm">98% de aprovação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
