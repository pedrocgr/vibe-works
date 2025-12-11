import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DiagnosticoInicial from "./pages/DiagnosticoInicial";
import ListaQuestoes from "./pages/ListaQuestoes";
import ResolverQuestoes from "./pages/ResolverQuestoes";
import DesempenhoTopicos from "./pages/DesempenhoTopicos";
import HistoricoQuestoes from "./pages/HistoricoQuestoes";
import Configuracoes from "./pages/Configuracoes";
import FeedbackSemanal from "./pages/FeedbackSemanal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/diagnostico-inicial" element={<DiagnosticoInicial />} />
          <Route path="/lista-questoes" element={<ListaQuestoes />} />
          <Route
            path="/resolver-questoes/:listaId"
            element={<ResolverQuestoes />}
          />
          <Route path="/desempenho" element={<DesempenhoTopicos />} />
          <Route path="/historico" element={<HistoricoQuestoes />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/feedback-semanal" element={<FeedbackSemanal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
