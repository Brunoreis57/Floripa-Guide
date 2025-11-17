import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Star, Car, MapPin } from "lucide-react";
import { listDrivers, type Driver as DriverRow } from "@/services/drivers";
import { useQuery } from "@tanstack/react-query";
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

const MotoristaDetalhe = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { data } = useQuery<DriverRow[]>({ queryKey: ["drivers"], queryFn: listDrivers });
  const drivers: Driver[] = (data ?? []).map((d: DriverRow) => ({ id: d.id, name: d.name, type: d.type, avgPrice: d.avg_price, whatsapp: d.whatsapp, rating: d.rating, areas: d.areas_served, photoUrl: d.photo_url }));
  const drv = drivers.find((d) => d.id === params.id);

  if (!drv) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">{t("drivers.title")}</h1>
        <p className="text-muted-foreground">{t("common.notFound", { defaultValue: "Item não encontrado" })}</p>
      </div>
    );
  }

  const contact = () => {
    const msg = encodeURIComponent(t("drivers.contactMessage", { defaultValue: "Olá! Quero falar com o motorista." }));
    const url = `https://wa.me/${drv.whatsapp}?text=${msg}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{drv.name}</h1>
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            <span className="text-muted-foreground">{drv.type} • {drv.avgPrice}</span>
            <Badge className="bg-accent text-accent-foreground ml-2">
              <Star className="w-3 h-3 mr-1" />{drv.rating}
            </Badge>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img src={drv.photoUrl || eventsImage} alt={drv.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span>{t("drivers.areas", { defaultValue: "Lugares atendidos" })}: {drv.areas.join(", ")}</span>
            </div>
            <Button onClick={contact}>
              <Phone className="w-4 h-4 mr-2" />
              {t("drivers.contact", { defaultValue: "Fale com o motorista" })}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MotoristaDetalhe;