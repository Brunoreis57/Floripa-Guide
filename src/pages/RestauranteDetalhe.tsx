import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Star, Utensils, DollarSign } from "lucide-react";
import { restaurantsData } from "./Restaurantes";

const RestauranteDetalhe = () => {
  const { t } = useTranslation();
  const params = useParams();
  const id = Number(params.id);
  const rest = restaurantsData.find((r) => r.id === id);

  if (!rest) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">{t("restaurants.title")}</h1>
        <p className="text-muted-foreground">{t("common.notFound", { defaultValue: "Item não encontrado" })}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{rest.name}</h1>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-accent text-accent" />
            <span className="font-semibold">{rest.rating}</span>
            <span className="text-muted-foreground">({rest.reviews} {t("home.reviews")})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="relative col-span-2 h-40 md:h-64 rounded shadow-md overflow-hidden">
              <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge>{rest.category}</Badge>
                <Badge variant="secondary">
                  <DollarSign className="w-3 h-3 mr-1" />{rest.priceRange}
                </Badge>
              </div>
            </div>
            <div className="grid gap-2 col-span-2 md:col-span-1 grid-cols-2 md:grid-rows-2">
              {[rest.image, rest.image].map((src, i) => (
                <button key={i} className="h-20 md:h-32 rounded shadow overflow-hidden">
                  <img src={src} alt={`foto ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="p-0 md:p-2">
            <p className="text-muted-foreground mb-4">{rest.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{rest.address}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm">
                <Utensils className="w-3 h-3 md:w-4 md:h-4 mr-2" />{t("restaurants.viewDetails")}
              </Button>
              <Button variant="outline" asChild>
                <a href={`tel:${rest.phone}`}>
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestauranteDetalhe;