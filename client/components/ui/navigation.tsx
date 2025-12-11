import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Menu,
  X,
  BarChart3,
  BookOpen,
  Target,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/lista-questoes", label: "Questões", icon: BookOpen },
    { href: "/desempenho", label: "Desempenho", icon: BarChart3 },
    { href: "/perfil", label: "Perfil", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
              <Brain className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              Sou MentorIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "bg-brand-50 text-brand-700"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA - Only show on landing page */}
          {location.pathname === "/" && (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button size="sm" className="bg-brand-500 hover:bg-brand-600" asChild>
                <Link to="/register">Começar Grátis</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      location.pathname === item.href
                        ? "bg-brand-50 text-brand-700"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {item.label}
                  </Link>
                );
              })}
              {location.pathname === "/" && (
                <div className="pt-4 border-t space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-brand-500 hover:bg-brand-600"
                    asChild
                  >
                    <Link to="/register">Começar Grátis</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
