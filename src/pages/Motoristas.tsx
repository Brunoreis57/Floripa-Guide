import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Phone, Star, Car } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listDrivers, type Driver as DriverRow } from "@/services/drivers";
import eventsImage from "@/assets/events-card.jpg";

type Driver = {
  id: string;
  name: string;
  type: "Uber" | "4x4" | "van" | "transfer" | "passeio";
  avgPrice: string;
  whatsapp: string;
  rating: number;
  areas: string[];
  photoUrl?: string;
};

const Motoristas = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("todos");

  const { data } = useQuery<DriverRow[]>({ queryKey: ["drivers"], queryFn: listDrivers });
  const drivers: Driver[] = (data ?? []).map((d: DriverRow) => ({ id: d.id, name: d.name, type: d.type, avgPrice: d.avg_price, whatsapp: d.whatsapp, rating: d.rating, areas: d.areas_served, photoUrl: d.photo_url }));

  const categories = [
    { id: "todos", label: t("drivers.filterAll", { defaultValue: "Todos" }) },
    { id: "Uber", label: "Uber" },
    { id: "4x4", label: "4x4" },
    { id: "van", label: "Van" },
    { id: "transfer", label: "Transfer" },
    { id: "passeio", label: t("drivers.tour", { defaultValue: "Passeio" }) },
  ];

  const filtered = useMemo(
    () => (filter === "todos" ? drivers : drivers.filter((d) => d.type === filter)),
    [filter, drivers]
  );

  const contact = (d: Driver) => {
    const msg = encodeURIComponent(t("drivers.contactMessage", { defaultValue: "Olá! Quero falar com o motorista." }));
    const url = `https://wa.me/${d.whatsapp}?text=${msg}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("drivers.title", { defaultValue: "Motoristas" })}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("drivers.subtitle", { defaultValue: "Transporte e transfers na ilha" })}
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">{t("drivers.filterBy", { defaultValue: "Filtrar por:" })}</span>
          </div>
          {categories.map((cat) => (
            <Button key={cat.id} variant={filter === cat.id ? "default" : "outline"} onClick={() => setFilter(cat.id)} className="whitespace-nowrap">
              {cat.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 auto-rows-fr">
          {filtered.map((d) => (
            <Link key={d.id} to={`/motoristas/${d.id}`}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-32 md:h-40 overflow-hidden">
                <img
                  src={d.photoUrl || eventsImage}
                  alt={d.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    <h3 className="text-base md:text-lg font-semibold text-foreground">{d.name}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{d.type} • {d.avgPrice}</p>
                </div>
                <Badge className="bg-accent text-accent-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  {d.rating}
                </Badge>
              </div>
              <div className="px-4 md:px-6 text-xs md:text-sm text-muted-foreground">
                {t("drivers.areas", { defaultValue: "Lugares atendidos" })}: {d.areas.join(", ")}
              </div>
              <div className="p-4 md:p-6 pt-4">
                <Button size="sm" className="w-full" onClick={() => (window.location.href = `/motoristas/${d.id}`)}>
                  <Car className="w-4 h-4 mr-2" />
                  {t("drivers.viewDetails", { defaultValue: "Ver Detalhes" })}
                </Button>
              </div>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Motoristas;
import { Link } from "react-router-dom";