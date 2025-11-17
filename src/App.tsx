import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PontosTuristicos from "./pages/PontosTuristicos";
import Restaurantes from "./pages/Restaurantes";
import Eventos from "./pages/Eventos";
import NotFound from "./pages/NotFound";
import MapPage from "./pages/Mapa";
import Cupons from "./pages/Cupons";
import Motoristas from "./pages/Motoristas";

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
              <Route path="/restaurantes" element={<Restaurantes />} />
              <Route path="/eventos" element={<Eventos />} />
              {/* Mapa Interativo */}
              <Route path="/mapa" element={<MapPage />} />
              <Route path="/cupons" element={<Cupons />} />
              <Route path="/motoristas" element={<Motoristas />} />
              <Route path="/roteiro" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Roteiro Automático</h1><p className="text-muted-foreground mt-4">Em breve...</p></div>} />
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
