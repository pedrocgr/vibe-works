import { HeroSection } from "@/components/sections/hero.jsx";
import { FeaturesSection } from "@/components/sections/features.jsx";
import { CTASection } from "@/components/sections/cta.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Landing Header - Without Navigation */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L15.09 8.26H22L17.82 12.61L19.91 18.87L12 14.52L4.09 18.87L6.18 12.61L2 8.26H8.91L12 2Z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              Sou MentorIA
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login-choice">Entrar</Link>
            </Button>
            <Button
              size="sm"
              className="bg-brand-500 hover:bg-brand-600"
              asChild
            >
              <Link to="/register-choice">Começar Grátis</Link>
            </Button>
          </div>
        </div>
      </header>
      <HeroSection />
      <FeaturesSection />
      <CTASection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L15.09 8.26H22L17.82 12.61L19.91 18.87L12 14.52L4.09 18.87L6.18 12.61L2 8.26H8.91L12 2Z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">MentorIA</span>
              </div>
              <p className="text-gray-400 text-sm">
                Seu mentor de matemática para o ENEM.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Recursos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MentorIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
