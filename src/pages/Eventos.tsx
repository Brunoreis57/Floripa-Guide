import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import eventsImage from "@/assets/events-card.jpg";

export type EventItem = {
  id: number;
  nameKey: "festaLagoa" | "showMusica" | "feiraArtesanato" | "campeonatoSurf" | "festivalGastronomico" | "porDoSolTrapiche";
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  price: string;
  image: string;
  trending: boolean;
};

export const eventsData: EventItem[] = [
  { id: 1, nameKey: "festaLagoa", date: "2025-02-15", time: "22:00", location: "Lagoa da Conceição", category: "Balada", description: "A melhor festa de verão da Lagoa com DJs internacionais e open bar.", price: "R$ 80", image: eventsImage, trending: true },
  { id: 2, nameKey: "showMusica", date: "2025-02-18", time: "20:00", location: "Jurerê Internacional", category: "Show", description: "Apresentação de artistas locais em um ambiente à beira-mar.", price: "R$ 50", image: eventsImage, trending: false },
  { id: 3, nameKey: "feiraArtesanato", date: "2025-02-20", time: "10:00", location: "Centro Histórico", category: "Feira", description: "Produtos artesanais locais, comidas típicas e música ao vivo.", price: "Grátis", image: eventsImage, trending: false },
  { id: 4, nameKey: "campeonatoSurf", date: "2025-02-22", time: "08:00", location: "Praia da Joaquina", category: "Esporte", description: "Competição de surf com atletas profissionais de todo o Brasil.", price: "Grátis", image: eventsImage, trending: true },
  { id: 5, nameKey: "festivalGastronomico", date: "2025-02-25", time: "12:00", location: "Beira-Mar Norte", category: "Gastronomia", description: "Degustação de pratos dos melhores restaurantes da ilha.", price: "R$ 120", image: eventsImage, trending: true },
  { id: 6, nameKey: "porDoSolTrapiche", date: "2025-02-28", time: "18:00", location: "Lagoa da Conceição", category: "Família", description: "Evento familiar com música ao vivo e food trucks.", price: "Grátis", image: eventsImage, trending: false },
];

const Eventos = () => {
  const { t } = useTranslation();

  const events = eventsData.map((e) => ({
    ...e,
    name: t(`events.items.${e.nameKey}`),
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Balada: "bg-purple-100 text-purple-700",
      Show: "bg-blue-100 text-blue-700",
      Feira: "bg-green-100 text-green-700",
      Esporte: "bg-orange-100 text-orange-700",
      Gastronomia: "bg-red-100 text-red-700",
      Família: "bg-pink-100 text-pink-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('events.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('events.subtitle')}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 auto-rows-fr">
          {events.map((event) => (
            <Link key={event.id} to={`/eventos/${event.id}`}>
            <Card
              className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-36 md:h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {event.trending && (
                  <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur-sm text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {t('events.trending')}
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <h3 className="font-semibold text-base md:text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {event.name}
                </h3>

                <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">
                  {event.description}
                </p>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-semibold text-foreground">
                      {event.price}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <Button variant="default" size="sm" className="w-full">
                  <Ticket className="w-4 h-4 mr-2" />
                  {t('events.viewDetails', { defaultValue: 'Ver Detalhes' })}
                </Button>
              </div>
            </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Card className="bg-gradient-primary text-white p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              {t('events.ctaTitle')}
            </h3>
            <p className="mb-4 text-white/90">
              {t('events.ctaDescription')}
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              {t('events.ctaButton')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Eventos;
import { Link } from "react-router-dom";
