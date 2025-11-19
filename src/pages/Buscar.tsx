import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Utensils, Calendar, Tag, Star } from "lucide-react";
import { spotsData } from "@/pages/PontosTuristicos";
import { restaurantsData } from "@/pages/Restaurantes";
import { eventsData } from "@/pages/Eventos";
import { couponsData } from "@/pages/Cupons";

const normalize = (s: string) => s.toLowerCase();

const Buscar = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const q = normalize(params.get("q") || "");

  const spots = useMemo(() =>
    spotsData.filter((s) =>
      [s.nameKey, s.description, s.category].some((f) => normalize(String(f)).includes(q)),
    ), [q]);

  const restaurants = useMemo(() =>
    restaurantsData.filter((r) =>
      [r.name, r.description, r.category, r.address].some((f) => normalize(String(f)).includes(q)),
    ), [q]);

  const events = useMemo(() =>
    eventsData.filter((e) =>
      [e.nameKey, e.description, e.category, e.location].some((f) => normalize(String(f)).includes(q)),
    ), [q]);

  const coupons = useMemo(() =>
    couponsData.filter((c) =>
      [c.title, c.business, c.description, c.category, c.code].some((f) => normalize(String(f)).includes(q)),
    ), [q]);

  const empty = !q || (spots.length === 0 && restaurants.length === 0 && events.length === 0 && coupons.length === 0);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          {t("common.search", { defaultValue: "Buscar" })}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t("common.searchResultsFor", { defaultValue: "Resultados para" })}: <span className="font-semibold">{params.get("q")}</span>
        </p>

        {empty && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">{t("common.noResults", { defaultValue: "Nenhum resultado" })}</p>
            <div className="mt-4 flex justify-center gap-2">
              <Link to="/pontos-turisticos"><Button variant="outline"><MapPin className="w-4 h-4 mr-2" />{t("header.spots")}</Button></Link>
              <Link to="/restaurantes"><Button variant="outline"><Utensils className="w-4 h-4 mr-2" />{t("header.restaurants")}</Button></Link>
              <Link to="/eventos"><Button variant="outline"><Calendar className="w-4 h-4 mr-2" />{t("header.events")}</Button></Link>
              <Link to="/cupons"><Button variant="outline"><Tag className="w-4 h-4 mr-2" />{t("header.coupons")}</Button></Link>
            </div>
          </Card>
        )}

        {spots.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5" />{t("header.spots")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 auto-rows-fr">
              {spots.map((s) => (
                <Link key={s.id} to={`/pontos-turisticos/${s.id}`}>
                  <Card className="h-full overflow-hidden group">
                    <div className="relative h-36 md:h-48 overflow-hidden">
                      <img src={s.image} alt={s.nameKey} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute bottom-3 left-3"><Badge>{s.category}</Badge></div>
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-accent text-accent" /><span className="font-semibold">{s.rating}</span></div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {restaurants.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Utensils className="w-5 h-5" />{t("header.restaurants")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 auto-rows-fr">
              {restaurants.map((r) => (
                <Link key={r.id} to={`/restaurantes/${r.id}`}>
                  <Card className="h-full overflow-hidden group">
                    <div className="relative h-36 md:h-48 overflow-hidden">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute bottom-3 left-3"><Badge variant="secondary">{r.priceRange}</Badge></div>
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-accent text-accent" /><span className="font-semibold">{r.rating}</span></div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {events.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" />{t("header.events")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 auto-rows-fr">
              {events.map((e) => (
                <Link key={e.id} to={`/eventos/${e.id}`}>
                  <Card className="h-full overflow-hidden group">
                    <div className="relative h-36 md:h-48 overflow-hidden">
                      <img src={e.image} alt={e.nameKey} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute bottom-3 left-3"><Badge>{e.category}</Badge></div>
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="text-sm">{e.location}</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {coupons.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Tag className="w-5 h-5" />{t("header.coupons")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 auto-rows-fr">
              {coupons.map((c) => (
                <Link key={c.id} to={`/cupons/${c.id}`}>
                  <Card className="h-full overflow-hidden group">
                    <div className="relative h-36 md:h-48 overflow-hidden">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute bottom-3 left-3"><Badge variant="secondary">{c.discount}</Badge></div>
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="text-sm">{c.title}</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Buscar;