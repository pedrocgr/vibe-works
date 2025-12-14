import "./global.css";

import { Toaster } from "@/components/ui/toaster.jsx";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DiagnosticoInicial from "./pages/DiagnosticoInicial.jsx";
import ListaQuestoes from "./pages/ListaQuestoes.jsx";
import ResolverQuestoes from "./pages/ResolverQuestoes.jsx";
import DesempenhoTopicos from "./pages/DesempenhoTopicos.jsx";
import HistoricoQuestoes from "./pages/HistoricoQuestoes.jsx";
import Configuracoes from "./pages/Configuracoes.jsx";
import FeedbackSemanal from "./pages/FeedbackSemanal.jsx";
import LoginChoice from "./pages/LoginChoice.jsx";
import Login from "./pages/Login.jsx";
import RegisterChoice from "./pages/RegisterChoice.jsx";
import StudentRegister from "./pages/StudentRegister.jsx";
import TeacherRegister from "./pages/TeacherRegister.jsx";
import TeacherLogin from "./pages/TeacherLogin.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import Perfil from "./pages/Perfil.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login-choice" element={<LoginChoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-choice" element={<RegisterChoice />} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/teacher-register" element={<TeacherRegister />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")).render(<App />);
