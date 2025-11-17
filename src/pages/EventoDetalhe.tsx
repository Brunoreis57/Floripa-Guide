import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Ticket, TrendingUp } from "lucide-react";
import { eventsData } from "./Eventos";

const EventoDetalhe = () => {
  const { t } = useTranslation();
  const params = useParams();
  const id = Number(params.id);
  const evt = eventsData.find((e) => e.id === id);

  if (!evt) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">{t("events.title")}</h1>
        <p className="text-muted-foreground">{t("common.notFound", { defaultValue: "Item não encontrado" })}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t(`events.items.${evt.nameKey}`)}</h1>
          {evt.trending && (
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              {t("events.trending")}
            </div>
          )}
        </div>

        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img src={evt.image} alt={t(`events.items.${evt.nameKey}`)} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <Badge>{evt.category}</Badge>
            </div>
          </div>
          <div className="p-6">
            <p className="text-muted-foreground mb-4">{evt.description}</p>
            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(evt.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>{evt.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{evt.location}</span>
              </div>
            </div>
            <Button variant="default">
              <Ticket className="w-4 h-4 mr-2" />
              {t("events.viewDetails")}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EventoDetalhe;