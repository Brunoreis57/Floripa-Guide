import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
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

        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge>{rest.category}</Badge>
              <Badge variant="secondary">
                <DollarSign className="w-3 h-3 mr-1" />{rest.priceRange}
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <p className="text-muted-foreground mb-4">{rest.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{rest.address}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <Utensils className="w-4 h-4 mr-2" />{t("restaurants.viewDetails")}
              </Button>
              <Button variant="outline" asChild>
                <a href={`tel:${rest.phone}`}>
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RestauranteDetalhe;