import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Star, Home } from "lucide-react";

const Hospedagem = () => {
  const { t } = useTranslation();

  const bookingUrl = import.meta.env.VITE_BOOKING_AFFILIATE_URL ?? "https://www.booking.com/city/br/florianopolis.pt-br.html";
  const airbnbUrl = import.meta.env.VITE_AIRBNB_AFFILIATE_URL ?? "https://www.airbnb.com/s/Florianopolis--Brazil/homes";

  const neighborhoodTips = [
    { name: "Lagoa da Conceição", vibe: "Vida noturna, esportes aquáticos", why: "Centro gastronômico, acesso fácil a praias do leste" },
    { name: "Campeche", vibe: "Praias, família", why: "Boa estrutura, proximidade da Ilha do Campeche" },
    { name: "Centro", vibe: "Praticidade, negócios", why: "Acesso a serviços, transporte e comércio" },
    { name: "Jurerê", vibe: "Luxo, beach clubs", why: "Boa infraestrutura e praias calmas" },
    { name: "Ingleses", vibe: "Mais econômico, família", why: "Muitas opções de hospedagem e restaurantes" },
  ];

  const priceRanges = [
    { season: "Baixa temporada", budget: "R$ 150–250", mid: "R$ 250–450", premium: "R$ 450+" },
    { season: "Alta temporada", budget: "R$ 250–400", mid: "R$ 400–700", premium: "R$ 700+" },
  ];

  const bestValueStays = [
    { name: "Pousada Vista da Lagoa", area: "Lagoa da Conceição", price: "R$ 300+", rating: 4.6, type: "booking" as const },
    { name: "Suites Campeche Sul", area: "Campeche", price: "R$ 280+", rating: 4.5, type: "airbnb" as const },
    { name: "Hotel Centro Light", area: "Centro", price: "R$ 260+", rating: 4.3, type: "booking" as const },
  ];

  const getAffiliateLink = (type: "booking" | "airbnb") => (type === "booking" ? bookingUrl : airbnbUrl);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t("stays.title", { defaultValue: "Hospedagem" })}</h1>
          <p className="text-muted-foreground mt-2">{t("stays.subtitle", { defaultValue: "Onde ficar em Florianópolis: bairros, preços e melhores opções" })}</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm">
                <Home className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                {t("stays.booking", { defaultValue: "Buscar no Booking" })}
              </Button>
            </a>
            <a href={airbnbUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm">
                <Home className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                {t("stays.airbnb", { defaultValue: "Buscar no Airbnb" })}
              </Button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {t("stays.neighborhoodTips", { defaultValue: "Dicas de bairros" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {neighborhoodTips.map((n) => (
                  <div key={n.name} className="border border-border rounded p-3">
                    <div className="font-semibold text-foreground">{n.name}</div>
                    <div className="text-xs text-muted-foreground">{n.vibe}</div>
                    <div className="text-sm mt-1">{n.why}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {t("stays.averagePrices", { defaultValue: "Preços médios (diária)" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priceRanges.map((p) => (
                  <div key={p.season} className="border border-border rounded p-3">
                    <div className="font-semibold">{p.season}</div>
                    <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Econômico</div>
                        <div className="font-medium">{p.budget}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Intermediário</div>
                        <div className="font-medium">{p.mid}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Premium</div>
                        <div className="font-medium">{p.premium}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-xs text-muted-foreground">{t("stays.pricesNote", { defaultValue: "Valores estimados variam por localização, data e comodidades." })}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                {t("stays.bestValue", { defaultValue: "Melhor custo-benefício" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bestValueStays.map((s) => (
                  <div key={s.name} className="border border-border rounded p-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.area} • {s.price}</div>
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span>{s.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <a href={getAffiliateLink(s.type)} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant={s.type === "booking" ? "default" : "outline"} className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm">
                        {s.type === "booking" ? t("stays.openBooking", { defaultValue: "Ver no Booking" }) : t("stays.openAirbnb", { defaultValue: "Ver no Airbnb" })}
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hospedagem;