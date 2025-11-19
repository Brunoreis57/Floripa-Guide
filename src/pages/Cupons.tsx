import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Tag } from "lucide-react";
import restaurantImage from "@/assets/restaurant-card.jpg";
import eventsImage from "@/assets/events-card.jpg";
import beachImage from "@/assets/beach-card.jpg";

export type CouponItem = {
  id: number;
  title: string;
  business: string;
  category: "restaurante" | "evento" | "passeio" | "hotel" | "bares" | "cafes";
  discount: string;
  code: string;
  validUntil: string;
  description: string;
  image: string;
  featured?: boolean;
};

export const couponsData: CouponItem[] = [
  {
    id: 1,
    title: "10% Off no Cardápio",
    business: "Ostradamus",
    category: "restaurante",
    discount: "10%",
    code: "FG2025-OSTRA",
    validUntil: "2025-03-31",
    description: "Desconto em pratos selecionados. Válido de segunda a quinta.",
    image: restaurantImage,
    featured: true,
  },
  {
    id: 2,
    title: "Ingresso 2x1",
    business: "Festa na Lagoa",
    category: "evento",
    discount: "50%",
    code: "FG2025-LAGOA",
    validUntil: "2025-02-28",
    description: "Na compra de um ingresso, ganhe outro. Limitado a 1 por CPF.",
    image: eventsImage,
  },
  {
    id: 3,
    title: "Passeio Ilha do Campeche",
    business: "Tour Floripa",
    category: "passeio",
    discount: "15%",
    code: "FG2025-CAMP",
    validUntil: "2025-04-15",
    description: "Desconto válido para saídas às 9h e 13h.",
    image: beachImage,
  },
  {
    id: 4,
    title: "Diária com 20% Off",
    business: "Hotel Beira-Mar",
    category: "hotel",
    discount: "20%",
    code: "FG2025-HOTEL",
    validUntil: "2025-05-01",
    description: "Desconto válido para reservas de domingo a quinta.",
    image: restaurantImage,
  },
  {
    id: 5,
    title: "Combo Burgers",
    business: "Burger Lab",
    category: "restaurante",
    discount: "12%",
    code: "FG2025-BURGER",
    validUntil: "2025-03-10",
    description: "Desconto no combo com 2 burgers e 2 bebidas.",
    image: restaurantImage,
  },
  {
    id: 6,
    title: "Show Ao Vivo",
    business: "Jurerê Live",
    category: "evento",
    discount: "30%",
    code: "FG2025-LIVE",
    validUntil: "2025-02-20",
    description: "Válido somente para pista. Sujeito à lotação.",
    image: eventsImage,
  },
  {
    id: 7,
    title: "Drinks 2x1",
    business: "Bar do Pescador",
    category: "bares",
    discount: "50%",
    code: "FG2025-BAR",
    validUntil: "2025-03-05",
    description: "Na compra de um drink, ganhe outro. Sexta a domingo.",
    image: restaurantImage,
    featured: false,
  },
  {
    id: 8,
    title: "Café + Croissant",
    business: "Café Lagoa",
    category: "cafes",
    discount: "20%",
    code: "FG2025-CAFE",
    validUntil: "2025-03-15",
    description: "Combo da manhã com desconto especial.",
    image: restaurantImage,
    featured: false,
  },
];

const Cupons = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const categories = [
    { id: "todos", label: t("coupons.filterAll") },
    { id: "restaurante", label: t("coupons.filterRestaurants") },
    { id: "evento", label: t("coupons.filterEvents") },
    { id: "passeio", label: t("coupons.filterTours") },
    { id: "hotel", label: t("coupons.filterHotels") },
    { id: "bares", label: t("coupons.filterBars") },
    { id: "cafes", label: t("coupons.filterCafes") },
  ];

  const filtered =
    selectedCategory === "todos"
      ? couponsData
      : couponsData.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("coupons.title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("coupons.subtitle")}
          </p>
        </div>

        <div className="mb-8 flex items-center gap-4 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">{t("coupons.filterBy")}</span>
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

        <div className="mb-6">
          <p className="text-muted-foreground">
            {t("coupons.resultsCount", { count: filtered.length })}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 auto-rows-fr">
          {filtered.map((c) => (
            <a key={c.id} href={`/cupons/${c.id}`}>
            <Card
              className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="relative h-36 md:h-48 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {c.featured && <Badge className="bg-accent">Premium</Badge>}
                  <Badge variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />{t("coupons.discount")}: {c.discount}
                  </Badge>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="font-semibold text-base md:text-lg text-foreground mb-1">{c.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">{c.business}</p>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">{c.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs md:text-sm text-muted-foreground">{t("coupons.code")}: {c.code}</span>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="default" className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm">{t("coupons.viewDetails", { defaultValue: "Ver Detalhes" })}</Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("coupons.validUntil", { date: c.validUntil })}
                </p>
              </div>
            </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cupons;