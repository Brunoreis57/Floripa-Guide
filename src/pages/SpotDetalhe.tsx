import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MapPin, Star, Navigation, Utensils, Calendar } from "lucide-react";
import { spotsData } from "./PontosTuristicos";
import { restaurantsData } from "./Restaurantes";
import { eventsData } from "./Eventos";
import beachImage from "@/assets/beach-card.jpg";

const SpotDetalhe = () => {
  const { t } = useTranslation();
  const params = useParams();
  const id = Number(params.id);
  const spot = spotsData.find((s) => s.id === id);
  const [showMore, setShowMore] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const areaKeywords: Record<string, string[]> = {
    joaquina: [
      "Joaquina",
      "Praia da Joaquina"
    ],
    praiaMole: [
      "Praia Mole"
    ],
    lagoinhaLeste: [
      "Lagoinha do Leste"
    ],
    morroCruz: [
      "Morro da Cruz"
    ],
    campeche: [
      "Campeche",
      "Praia do Campeche"
    ],
    costaLagoa: [
      "Costa da Lagoa"
    ],
  };

  if (!spot) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">{t("spots.title")}</h1>
        <p className="text-muted-foreground">{t("common.notFound", { defaultValue: "Item não encontrado" })}</p>
      </div>
    );
  }

  const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const keywords = areaKeywords[spot.nameKey] ?? [];
  const relatedRestaurants = restaurantsData.filter((r) => {
    const addr = normalize(r.address);
    return keywords.some((k) => addr.includes(normalize(k)));
  });
  const relatedEvents = eventsData.filter((e) => {
    const loc = normalize(e.location);
    return keywords.some((k) => loc.includes(normalize(k)));
  });
  const gallery = [spot.image, beachImage, beachImage];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t(`spots.items.${spot.nameKey}`)}</h1>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-accent text-accent" />
            <span className="font-semibold">{spot.rating}</span>
            <span className="text-muted-foreground">({spot.reviews})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div className="relative col-span-2 h-40 md:h-64 rounded shadow-md overflow-hidden cursor-zoom-in" onClick={() => setLightboxSrc(spot.image)}>
                <img src={spot.image} alt={t(`spots.items.${spot.nameKey}`)} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge>{spot.category}</Badge>
                </div>
              </div>
              <div className="grid gap-2 col-span-2 md:col-span-1 grid-cols-2 md:grid-rows-2">
                {gallery.slice(1, 3).map((src, i) => (
                  <button key={i} className="h-20 md:h-32 rounded shadow overflow-hidden cursor-zoom-in" onClick={() => setLightboxSrc(src)}>
                    <img src={src} alt={`foto ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="p-0 md:p-2">
              <p className="text-muted-foreground mb-3">
                {spot.nameKey === "joaquina"
                  ? (
                    showMore
                      ? "A Praia da Joaquina é um dos ícones de Florianópolis, famosa pelas dunas, campeonatos de surf e estrutura para visitantes. Com ondas fortes e areia clara, é ideal para quem busca esportes, contemplação e fotos incríveis. Próxima à Lagoa da Conceição, oferece fácil acesso a restaurantes e vida noturna. Há estacionamentos e áreas de apoio; durante o verão, o movimento é intenso e recomenda-se chegar cedo."
                      : "A Praia da Joaquina é um dos ícones de Florianópolis, famosa pelas dunas e campeonatos de surf. Próxima à Lagoa da Conceição, oferece fácil acesso a restaurantes e vida noturna..."
                  )
                  : spot.description}
              </p>
              <Button variant="outline" size="sm" className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm" onClick={() => setShowMore((v) => !v)}>
                {showMore ? t("common.showLess", { defaultValue: "Mostrar menos" }) : t("common.showMore", { defaultValue: "Mostrar mais" })}
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground my-3">
                <MapPin className="w-4 h-4" />
                <span>{spot.bestTime}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" />{t("spots.viewOnMap")}
                </Button>
                <Button variant="outline" size="sm" className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm">
                  <Navigation className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </div>
            </div>
        </div>

        <Dialog open={!!lightboxSrc} onOpenChange={(o) => { if (!o) setLightboxSrc(null); }}>
          <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
            {lightboxSrc && (
              <img src={lightboxSrc} alt="imagem" className="max-h-[80vh] w-full object-contain rounded" />
            )}
          </DialogContent>
        </Dialog>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Utensils className="w-5 h-5" /> {t("restaurants.title")}
          </h2>
          {relatedRestaurants.length === 0 ? (
            <p className="text-muted-foreground">{t("common.noResults", { defaultValue: "Nenhum restaurante próximo" })}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
              {relatedRestaurants.slice(0, 6).map((r) => (
                <Link key={r.id} to={`/restaurantes/${r.id}`} className="group">
                  <Card className="h-full overflow-hidden">
                    <div className="h-24 md:h-32 overflow-hidden">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm md:text-base font-semibold text-foreground">{r.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{r.address}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" /> {t("events.title")}
          </h2>
          {relatedEvents.length === 0 ? (
            <p className="text-muted-foreground">{t("common.noResults", { defaultValue: "Nenhum evento próximo" })}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
              {relatedEvents.slice(0, 6).map((e) => (
                <Link key={e.id} to={`/eventos/${e.id}`} className="group">
                  <Card className="h-full overflow-hidden">
                    <div className="h-24 md:h-32 overflow-hidden">
                      <img src={e.image} alt={t(`events.items.${e.nameKey}`)} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm md:text-base font-semibold text-foreground">{t(`events.items.${e.nameKey}`)}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{e.location}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotDetalhe;