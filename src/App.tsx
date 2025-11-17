import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
              <Route path="/cupons" element={<Cupons />} />
              <Route path="/cupons/:id" element={<CupomDetalhe />} />
              <Route path="/motoristas" element={<Motoristas />} />
              <Route path="/motoristas/:id" element={<MotoristaDetalhe />} />
              <Route path="/roteiro" element={<RoteiroIA />} />
              <Route path="/painel" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Painel do Parceiro</h1><p className="text-muted-foreground mt-4">Em breve...</p></div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
