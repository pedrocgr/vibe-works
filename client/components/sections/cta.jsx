import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-brand-500">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para destravar seu potencial em matemática?
          </h2>

          <p className="text-xl text-brand-100 mb-8">
            Comece sua jornada hoje e veja resultados em dias. Avaliação diagnóstica completa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-brand-600 hover:bg-brand-50 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link to="/register">
                Destravar Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-brand-400 px-8 py-4 text-lg"
              asChild
            >
              <Link to="#contato">
                Saiba Mais
              </Link>
            </Button>
          </div>

          <p className="text-brand-100 text-sm mt-8">
            ✓ Sem cartão de crédito necessário  ✓ Acesso completo  ✓ Cancelamento a qualquer hora
          </p>
        </div>
      </div>
    </section>
  );
}
