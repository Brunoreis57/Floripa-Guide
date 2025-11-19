import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Utensils,
  Star,
  DollarSign,
  MapPin,
  Tag,
  Filter,
} from "lucide-react";
import restaurantImage from "@/assets/restaurant-card.jpg";
export type RestaurantItem = {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  priceRange: string;
  phone: string;
  address: string;
  hasCoupon: boolean;
  plan: "premium" | "destaque" | "free";
  image: string;
};

export const restaurantsData: RestaurantItem[] = [
  {
    id: 1,
    name: "Ostradamus",
    category: "frutos-mar",
    rating: 4.9,
    reviews: 892,
    description: "Especializado em ostras frescas e frutos do mar da região. Vista para o mar.",
    priceRange: "$$$",
    phone: "(48) 3232-1234",
    address: "Lagoa da Conceição",
    hasCoupon: true,
    plan: "premium",
    image: restaurantImage,
  },
  {
    id: 2,
    name: "Churrascaria Bonanza",
    category: "brasileira",
    rating: 4.7,
    reviews: 654,
    description: "Rodízio de carnes premium com buffet completo. Ambiente familiar.",
    priceRange: "$$",
    phone: "(48) 3232-5678",
    address: "Centro",
    hasCoupon: false,
    plan: "destaque",
    image: restaurantImage,
  },
  {
    id: 3,
    name: "Pizzaria Bella Vista",
    category: "italiana",
    rating: 4.6,
    reviews: 543,
    description: "Pizzas artesanais no forno a lenha. Massa fermentada naturalmente.",
    priceRange: "$$",
    phone: "(48) 3232-9876",
    address: "Ingleses",
    hasCoupon: true,
    plan: "free",
    image: restaurantImage,
  },
  {
    id: 4,
    name: "Sushi Master",
    category: "japonesa",
    rating: 4.8,
    reviews: 421,
    description: "Rodízio japonês com peixes frescos e preparos tradicionais.",
    priceRange: "$$$",
    phone: "(48) 3232-4321",
    address: "Lagoa da Conceição",
    hasCoupon: true,
    plan: "premium",
    image: restaurantImage,
  },
  {
    id: 5,
    name: "Burger Lab",
    category: "hamburgueria",
    rating: 4.5,
    reviews: 789,
    description: "Hambúrgueres artesanais com blend especial da casa. Craft beers.",
    priceRange: "$$",
    phone: "(48) 3232-7890",
    address: "Campeche",
    hasCoupon: false,
    plan: "destaque",
    image: restaurantImage,
  },
  {
    id: 6,
    name: "Veg Garden",
    category: "vegetariana",
    rating: 4.6,
    reviews: 412,
    description: "Opções vegetarianas e veganas com ingredientes locais.",
    priceRange: "$$",
    phone: "(48) 3232-6543",
    address: "Trindade",
    hasCoupon: true,
    plan: "free",
    image: restaurantImage,
  },
  {
    id: 7,
    name: "Bar do Pescador",
    category: "bares",
    rating: 4.4,
    reviews: 305,
    description: "Bar à beira mar com petiscos e drinks autorais.",
    priceRange: "$$",
    phone: "(48) 3232-1122",
    address: "Santo Antônio de Lisboa",
    hasCoupon: false,
    plan: "free",
    image: restaurantImage,
  },
  {
    id: 8,
    name: "Fast & Tasty",
    category: "fast-food",
    rating: 4.2,
    reviews: 518,
    description: "Sanduíches e wraps rápidos com opções saudáveis.",
    priceRange: "$",
    phone: "(48) 3232-7788",
    address: "Centro",
    hasCoupon: true,
    plan: "destaque",
    image: restaurantImage,
  },
];

const Restaurantes = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const categories = [
    { id: "todos", label: t('restaurants.filterAll') },
    { id: "frutos-mar", label: t('restaurants.filterSeafood') },
    { id: "brasileira", label: t('restaurants.filterBrazilian') },
    { id: "italiana", label: t('restaurants.filterItalian') },
    { id: "japonesa", label: t('restaurants.filterJapanese') },
    { id: "hamburgueria", label: t('restaurants.filterBurgers') },
    { id: "fast-food", label: t('restaurants.filterFastFood') },
    { id: "vegetariana", label: t('restaurants.filterVegetarian') },
    { id: "bares", label: t('restaurants.filterBars') },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Ostradamus",
      category: "frutos-mar",
      rating: 4.9,
      reviews: 892,
      description: "Especializado em ostras frescas e frutos do mar da região. Vista para o mar.",
      priceRange: "$$$",
      phone: "(48) 3232-1234",
      address: "Lagoa da Conceição",
      hasCoupon: true,
      plan: "premium",
      image: restaurantImage,
    },
    {
      id: 2,
      name: "Churrascaria Bonanza",
      category: "brasileira",
      rating: 4.7,
      reviews: 654,
      description: "Rodízio de carnes premium com buffet completo. Ambiente familiar.",
      priceRange: "$$",
      phone: "(48) 3232-5678",
      address: "Centro",
      hasCoupon: false,
      plan: "destaque",
      image: restaurantImage,
    },
    {
      id: 3,
      name: "Pizzaria Bella Vista",
      category: "italiana",
      rating: 4.6,
      reviews: 543,
      description: "Pizzas artesanais no forno a lenha. Massa fermentada naturalmente.",
      priceRange: "$$",
      phone: "(48) 3232-9876",
      address: "Ingleses",
      hasCoupon: true,
      plan: "free",
      image: restaurantImage,
    },
    {
      id: 4,
      name: "Sushi Master",
      category: "japonesa",
      rating: 4.8,
      reviews: 421,
      description: "Rodízio japonês com peixes frescos e preparos tradicionais.",
      priceRange: "$$$",
      phone: "(48) 3232-4321",
      address: "Lagoa da Conceição",
      hasCoupon: true,
      plan: "premium",
      image: restaurantImage,
    },
    {
      id: 5,
      name: "Burger Lab",
      category: "hamburgueria",
      rating: 4.5,
      reviews: 789,
      description: "Hambúrgueres artesanais com blend especial da casa. Craft beers.",
      priceRange: "$$",
      phone: "(48) 3232-7890",
      address: "Campeche",
      hasCoupon: false,
      plan: "destaque",
      image: restaurantImage,
    },
    {
      id: 6,
      name: "Veg Garden",
      category: "vegetariana",
      rating: 4.6,
      reviews: 412,
      description: "Opções vegetarianas e veganas com ingredientes locais.",
      priceRange: "$$",
      phone: "(48) 3232-6543",
      address: "Trindade",
      hasCoupon: true,
      plan: "free",
      image: restaurantImage,
    },
    {
      id: 7,
      name: "Bar do Pescador",
      category: "bares",
      rating: 4.4,
      reviews: 305,
      description: "Bar à beira mar com petiscos e drinks autorais.",
      priceRange: "$$",
      phone: "(48) 3232-1122",
      address: "Santo Antônio de Lisboa",
      hasCoupon: false,
      plan: "free",
      image: restaurantImage,
    },
    {
      id: 8,
      name: "Fast & Tasty",
      category: "fast-food",
      rating: 4.2,
      reviews: 518,
      description: "Sanduíches e wraps rápidos com opções saudáveis.",
      priceRange: "$",
      phone: "(48) 3232-7788",
      address: "Centro",
      hasCoupon: true,
      plan: "destaque",
      image: restaurantImage,
    },
  ];

  const planOrder: Record<string, number> = { premium: 0, destaque: 1, free: 2 };
  const filteredRestaurants = (
    selectedCategory === "todos"
      ? restaurants
      : restaurants.filter((rest) => rest.category === selectedCategory)
  ).slice().sort((a, b) => planOrder[a.plan] - planOrder[b.plan]);

  const getPriceColor = (price: string) => {
    return "text-muted-foreground";
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "premium":
        return <Badge className="bg-accent">Premium</Badge>;
      case "destaque":
        return <Badge variant="secondary">Destaque</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('restaurants.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('restaurants.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex items-center gap-4 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">{t('restaurants.filterBy')}</span>
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
            {t('restaurants.resultsCount', { count: filteredRestaurants.length })}
          </p>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 auto-rows-fr">
          {filteredRestaurants.map((restaurant) => (
            <Link key={restaurant.id} to={`/restaurantes/${restaurant.id}`}>
            <Card
              className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-36 md:h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {getPlanBadge(restaurant.plan)}
                </div>
                {restaurant.hasCoupon && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-primary text-primary-foreground">
                      <Tag className="w-3 h-3 mr-1" />
                      {t('restaurants.couponAvailable')}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold text-foreground text-sm">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">
                  {restaurant.description}
                </p>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className={getPriceColor(restaurant.priceRange)}>
                      {restaurant.priceRange}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {restaurant.reviews} avaliações
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="w-full">
                    <Utensils className="w-4 h-4 mr-1" />
                    {t('restaurants.viewDetails', { defaultValue: 'Ver Detalhes' })}
                  </Button>
                </div>
              </div>
            </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Card className="bg-gradient-sunset text-white p-8 text-center">
            <Utensils className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t('restaurants.ctaTitle')}</h3>
            <p className="mb-4 text-white/90">
              {t('restaurants.ctaDescription')}
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-accent hover:bg-white/90"
            >
              {t('restaurants.ctaButton')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Restaurantes;
import { Link } from "react-router-dom";
