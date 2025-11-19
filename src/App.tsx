import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "@/pages/Home";
import PontosTuristicos from "@/pages/PontosTuristicos";
import Restaurantes from "@/pages/Restaurantes";
import Eventos from "@/pages/Eventos";
import NotFound from "@/pages/NotFound";
import MapPage from "@/pages/Mapa";
import RoteiroIA from "@/pages/RoteiroIA";
import Cupons from "@/pages/Cupons";
import Motoristas from "@/pages/Motoristas";
import SpotDetalhe from "@/pages/SpotDetalhe";
import RestauranteDetalhe from "@/pages/RestauranteDetalhe";
import EventoDetalhe from "@/pages/EventoDetalhe";
import CupomDetalhe from "@/pages/CupomDetalhe";
import MotoristaDetalhe from "@/pages/MotoristaDetalhe";
import Hospedagem from "@/pages/Hospedagem";
import Painel from "@/pages/Painel";
import Parceiros from "@/pages/Parceiros";
import ParceirosCadastro from "@/pages/ParceirosCadastro";
import ParceirosLogin from "@/pages/ParceirosLogin";
import { auth } from "@/services/auth";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};

const RequirePartner = ({ children }: { children: JSX.Element }) => {
  const session = auth.getSession();
  if (!session) return <Navigate to="/parceiros/login" replace />;
  if (session.role !== "partner") return <Navigate to="/" replace />;
  return children;
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pontos-turisticos" element={<PontosTuristicos />} />
                <Route path="/pontos-turisticos/:id" element={<SpotDetalhe />} />
                <Route path="/restaurantes" element={<Restaurantes />} />
                <Route path="/restaurantes/:id" element={<RestauranteDetalhe />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/eventos/:id" element={<EventoDetalhe />} />
                {/* Mapa Interativo */}
                <Route path="/mapa" element={<MapPage />} />
                <Route path="/hospedagem" element={<Hospedagem />} />
                <Route path="/cupons" element={<Cupons />} />
                <Route path="/cupons/:id" element={<CupomDetalhe />} />
                <Route path="/motoristas" element={<Motoristas />} />
                <Route path="/motoristas/:id" element={<MotoristaDetalhe />} />
                <Route path="/roteiro" element={<RoteiroIA />} />
                <Route path="/painel" element={<RequirePartner><Painel /></RequirePartner>} />
                <Route path="/painel-parceiro" element={<RequirePartner><Painel /></RequirePartner>} />
                <Route path="/parceiros" element={<Parceiros />} />
                <Route path="/parceiros/cadastro" element={<ParceirosCadastro />} />
                <Route path="/parceiros/login" element={<ParceirosLogin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
