import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Star,
  Filter,
  Navigation,
  TrendingUp,
} from "lucide-react";
import beachImage from "@/assets/beach-card.jpg";

export type SpotItem = {
  id: number;
  nameKey: "joaquina" | "praiaMole" | "lagoinhaLeste" | "morroCruz" | "campeche" | "costaLagoa";
  category: "praia" | "trilha" | "mirante" | "parque" | "historico";
  rating: number;
  reviews: number;
  description: string;
  bestTime: "Manhã" | "Tarde" | "Dia todo" | "Pôr do sol";
  difficulty: "Fácil" | "Médio" | "Difícil";
  image: string;
  popular: boolean;
};

export const spotsData: SpotItem[] = [
  { id: 1, nameKey: "joaquina", category: "praia", rating: 4.8, reviews: 1245, description: "Uma das praias mais famosas de Floripa, ideal para surf e contemplação.", bestTime: "Manhã", difficulty: "Fácil", image: beachImage, popular: true },
  { id: 2, nameKey: "praiaMole", category: "praia", rating: 4.7, reviews: 987, description: "Praia badalada, perfeita para quem gosta de agito e esportes aquáticos.", bestTime: "Tarde", difficulty: "Fácil", image: beachImage, popular: true },
  { id: 3, nameKey: "lagoinhaLeste", category: "trilha", rating: 4.9, reviews: 654, description: "Praia paradisíaca acessível apenas por trilha. Uma das mais bonitas de SC.", bestTime: "Dia todo", difficulty: "Difícil", image: beachImage, popular: false },
  { id: 4, nameKey: "morroCruz", category: "mirante", rating: 4.6, reviews: 432, description: "Vista 360° de Florianópolis. Melhor pôr do sol da cidade.", bestTime: "Pôr do sol", difficulty: "Fácil", image: beachImage, popular: true },
  { id: 5, nameKey: "campeche", category: "praia", rating: 4.7, reviews: 891, description: "Praia extensa com águas cristalinas e ótima infraestrutura.", bestTime: "Manhã", difficulty: "Fácil", image: beachImage, popular: false },
  { id: 6, nameKey: "costaLagoa", category: "trilha", rating: 4.5, reviews: 321, description: "Trilha plana à beira da Lagoa da Conceição com restaurantes no caminho.", bestTime: "Manhã", difficulty: "Médio", image: beachImage, popular: false },
];

const PontosTuristicos = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const categories = [
    { id: "todos", label: t('spots.filterAll') },
    { id: "praia", label: t('spots.filterBeaches') },
    { id: "trilha", label: t('spots.filterTrails') },
    { id: "mirante", label: t('spots.filterViewpoints') },
    { id: "parque", label: t('spots.filterParks') },
    { id: "historico", label: t('spots.filterHistoric') },
  ];

  const spots = spotsData.map((s) => ({
    ...s,
    name: t(`spots.items.${s.nameKey}`),
  }));

  const filteredSpots =
    selectedCategory === "todos"
      ? spots
      : spots.filter((spot) => spot.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-700";
      case "Médio":
        return "bg-yellow-100 text-yellow-700";
      case "Difícil":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('spots.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('spots.subtitle')}
          </p>
        </div>

        {/* Filters */}
          <div className="mb-8 flex items-center gap-4 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-5 h-5" />
              <span className="font-semibold">{t('spots.filterBy')}</span>
            </div>
            {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className="whitespace-nowrap"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {t('spots.resultsCount', { count: filteredSpots.length })}
          </p>
        </div>

        {/* Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <Card
              key={spot.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {spot.popular && (
                  <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur-sm text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {t('spots.popular')}
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <Badge className={getDifficultyColor(spot.difficulty)}>
                    {spot.difficulty === 'Fácil' ? t('spots.difficultyEasy') : spot.difficulty === 'Médio' ? t('spots.difficultyMedium') : spot.difficulty === 'Difícil' ? t('spots.difficultyHard') : spot.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {spot.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {spot.description}
                </p>

                {/* Info */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{
                      spot.bestTime === 'Manhã' ? t('spots.bestTimeMorning') :
                      spot.bestTime === 'Tarde' ? t('spots.bestTimeAfternoon') :
                      spot.bestTime === 'Dia todo' ? t('spots.bestTimeAllDay') :
                      spot.bestTime === 'Pôr do sol' ? t('spots.bestTimeSunset') : spot.bestTime
                    }</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">
                      {spot.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({spot.reviews})
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {t('spots.viewOnMap')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-hero p-8 border-2 border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {t('spots.ctaTitle')}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t('spots.ctaDescription')}
            </p>
            <Button size="lg" className="bg-gradient-sunset">
              {t('spots.ctaButton')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PontosTuristicos;
