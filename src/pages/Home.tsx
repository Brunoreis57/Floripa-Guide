import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Utensils,
  Calendar,
  Map,
  Ticket,
  Car,
  Route,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-floripa1.jpg";
import beachCard from "@/assets/beach-card.jpg";
import restaurantCard from "@/assets/restaurant-card.jpg";
import eventsCard from "@/assets/events-card.jpg";

const Home = () => {
  const { t } = useTranslation();
  const categories = [
    {
      icon: MapPin,
      title: t('home.spots'),
      description: t('home.categorySpotsDesc'),
      link: "/pontos-turisticos",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Utensils,
      title: t('home.restaurants'),
      description: t('home.categoryRestaurantsDesc'),
      link: "/restaurantes",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Calendar,
      title: t('home.events'),
      description: t('home.categoryEventsDesc'),
      link: "/eventos",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Map,
      title: t('home.map'),
      description: t('home.categoryMapDesc'),
      link: "/mapa",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Ticket,
      title: t('home.coupons'),
      description: t('home.categoryCouponsDesc'),
      link: "/cupons",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Car,
      title: t('home.drivers'),
      description: t('home.categoryDriversDesc'),
      link: "/motoristas",
      color: "bg-accent/10 text-accent",
    },
  ];

  const topSpots = [
    {
      name: t('home.topSpots.joaquina'),
      category: t('common.beach'),
      rating: 4.8,
      reviews: 1245,
      image: beachCard,
    },
    {
      name: t('home.topSpots.ostradamus'),
      category: t('common.restaurant'),
      rating: 4.9,
      reviews: 892,
      image: restaurantCard,
    },
    {
      name: t('home.topSpots.festaLagoa'),
      category: t('common.event'),
      rating: 4.7,
      reviews: 654,
      image: eventsCard,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Floripa hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
            {t('home.heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            {t('home.heroSubtitle')}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-full shadow-lg p-2 flex gap-2 animate-scale-in">
            <Input
              type="text"
              placeholder={t('home.searchPlaceholder')}
              className="flex-1 border-0 focus-visible:ring-0 text-lg"
            />
            <Button size="lg" className="rounded-full px-8 bg-gradient-primary">
              <Search className="w-5 h-5 mr-2" />
              {t('home.searchButton')}
            </Button>
          </div>

          {/* Quick Action */}
          <div className="mt-8">
            <Link to="/roteiro">
              <Button size="lg" variant="secondary" className="bg-white/90 hover:bg-white text-primary font-semibold shadow-md">
                <Route className="w-5 h-5 mr-2" />
                {t('header.createItinerary')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('home.categoriesTitle')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('home.heroSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link key={index} to={category.link}>
                <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-2 hover:border-primary/20">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base md:text-lg text-foreground mb-1">
                        {category.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Top 10 de Floripa */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold text-sm">{t('events.trending')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.top10Title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('home.top10Subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {topSpots.map((spot, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                <div className="relative h-36 md:h-48 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-foreground flex items-center gap-1">
                    <span className="text-accent">#{index + 1}</span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-semibold text-base md:text-lg text-foreground mb-1">
                    {spot.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">
                    {spot.category}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">
                        {spot.rating}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      ({spot.reviews} {t('home.reviews')})
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/pontos-turisticos">
              <Button size="lg" variant="outline">
                {t('spots.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-primary p-8 md:p-12 text-center text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
          <div className="relative z-10">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.top10Title')}
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              {t('home.heroSubtitle')}
            </p>
            <Link to="/roteiro">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold">
                {t('header.createItinerary')}
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
