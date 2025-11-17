import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths under Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const getIcon = (category: Place["category"]) => {
  const bg =
    category === "praia" ? "#0ea5e9" :
    category === "trilha" ? "#10b981" :
    category === "mirante" ? "#f59e0b" :
    category === "comida" ? "#ef4444" :
    category === "evento" ? "#8b5cf6" :
    "#64748b";
  return L.divIcon({
    className: "",
    html: `<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${bg};color:#fff;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${category === "comida" ? "🍽" : category === "evento" ? "🎉" : category === "trilha" ? "🥾" : category === "mirante" ? "👀" : category === "estacionamento" ? "🅿️" : "🏖"}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

type Place = {
  id: string;
  name: string;
  category: "praia" | "trilha" | "comida" | "evento" | "estacionamento" | "mirante";
  coords: [number, number];
  description?: string;
  rating?: number;
};

import { spotsData } from "./PontosTuristicos";
import { restaurantsData } from "./Restaurantes";
import { eventsData } from "./Eventos";

const spotCoords: Record<string, [number, number]> = {
  joaquina: [-27.5977, -48.4695],
  praiaMole: [-27.5918, -48.4302],
  lagoinhaLeste: [-27.7654, -48.5103],
  morroCruz: [-27.5890, -48.5460],
  campeche: [-27.6585, -48.4950],
  costaLagoa: [-27.5880, -48.4770],
};

const restaurantCoords: Record<string, [number, number]> = {
  Ostradamus: [-27.5827, -48.5141],
  "Churrascaria Bonanza": [-27.5950, -48.5480],
  "Pizzaria Bella Vista": [-27.4800, -48.4100],
  "Sushi Master": [-27.5835, -48.5150],
  "Burger Lab": [-27.6600, -48.5000],
  "Veg Garden": [-27.6000, -48.5000],
  "Bar do Pescador": [-27.4960, -48.5520],
  "Fast & Tasty": [-27.5965, -48.5490],
};

const eventCoords: Record<string, [number, number]> = {
  festaLagoa: [-27.5885, -48.5079],
  campeonatoSurf: [-27.5977, -48.4695],
  showMusica: [-27.4330, -48.4200],
  feiraArtesanato: [-27.5954, -48.5480],
  festivalGastronomico: [-27.5960, -48.5485],
  porDoSolTrapiche: [-27.5885, -48.5079],
};

const mapSpotToPlace = (s: typeof spotsData[number]): Place => {
  const cat: Place["category"] = s.category === "praia" ? "praia" : s.category === "trilha" ? "trilha" : s.category === "mirante" ? "mirante" : "praia";
  return {
    id: `spot-${s.id}`,
    name: s.nameKey,
    category: cat,
    coords: spotCoords[s.nameKey],
    description: s.description,
    rating: s.rating,
  };
};

const mapRestaurantToPlace = (r: typeof restaurantsData[number]): Place => {
  const cat: Place["category"] = "comida";
  return {
    id: `rest-${r.id}`,
    name: r.name,
    category: cat,
    coords: restaurantCoords[r.name],
    description: r.description,
    rating: r.rating,
  };
};

const mapEventToPlace = (e: typeof eventsData[number]): Place => {
  const cat: Place["category"] = "evento";
  return {
    id: `evt-${e.id}`,
    name: e.nameKey,
    category: cat,
    coords: eventCoords[e.nameKey],
    description: e.description,
  };
};

const unifiedPlaces: Place[] = [
  ...spotsData.filter((s) => spotCoords[s.nameKey]).map(mapSpotToPlace),
  ...restaurantsData.filter((r) => restaurantCoords[r.name]).map(mapRestaurantToPlace),
  ...eventsData.filter((e) => eventCoords[e.nameKey]).map(mapEventToPlace),
  { id: "est1", name: "Estacionamento Joaquina", category: "estacionamento", coords: [-27.5990, -48.4660] },
];

const MapPage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("todos");

  const categories = [
    { id: "todos", label: t("spots.filterAll") },
    { id: "praia", label: t("spots.filterBeaches") },
    { id: "trilha", label: t("spots.filterTrails") },
    { id: "comida", label: t("restaurants.title") },
    { id: "evento", label: t("events.title") },
    { id: "estacionamento", label: t("map.parking", { defaultValue: "Estacionamentos" }) },
    { id: "mirante", label: t("spots.filterViewpoints") },
  ];

  const filtered = useMemo(
    () => (filter === "todos" ? unifiedPlaces : unifiedPlaces.filter((p) => p.category === filter)),
    [filter]
  );

  const getRouteForCategory = (cat: Place["category"]) => {
    if (cat === "comida") return "/restaurantes";
    if (cat === "evento") return "/eventos";
    return "/pontos-turisticos";
  };

  const getActionLabel = (cat: Place["category"]) => {
    if (cat === "comida") return t("restaurants.viewDetails");
    if (cat === "evento") return t("events.viewDetails");
    return t("spots.viewAll");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t("header.map")}</h1>
          <p className="text-muted-foreground">{t("home.categoryMapDesc", { defaultValue: "Explore a ilha" })}</p>
        </div>

        {/* Filters */}
        <div className="mb-4 flex items-center gap-3 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">{t("spots.filterBy")}</span>
          </div>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={filter === cat.id ? "default" : "outline"}
              onClick={() => setFilter(cat.id)}
              className="whitespace-nowrap"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Map */}
        <Card className="overflow-hidden">
          <div className="h-[70vh]">
            {(() => {
              return (
                <MapContainer center={[-27.5945, -48.5477] as L.LatLngExpression} zoom={12} className="h-full w-full">
                  {import.meta.env.VITE_MAPBOX_TOKEN ? (
                    <TileLayer
                      url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`}
                      attribution="&copy; Mapbox &copy; OpenStreetMap contributors"
                      tileSize={512}
                      zoomOffset={-1}
                    />
                  ) : (
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                  )}
                  {filtered.map((p) => (
                    <Marker key={p.id} position={p.coords as L.LatLngExpression} icon={getIcon(p.category) as L.DivIcon}>
                      <Popup>
                        <div className="w-64">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-foreground">{
                          p.category === "praia" || p.category === "trilha" || p.category === "mirante"
                            ? t(`spots.items.${p.name}`)
                            : p.category === "evento"
                            ? t(`events.items.${p.name}`)
                            : p.name
                        }</span>
                      </div>
                      <Badge className="mb-2">{
                        p.category === "praia" ? t("spots.filterBeaches") :
                        p.category === "trilha" ? t("spots.filterTrails") :
                        p.category === "mirante" ? t("spots.filterViewpoints") :
                        p.category === "comida" ? t("restaurants.title") :
                        p.category === "evento" ? t("events.title") :
                        t("map.parking", { defaultValue: "Estacionamento" })
                      }</Badge>
                      {p.description && (
                        <p className="text-sm text-muted-foreground mb-2">{p.description}</p>
                      )}
                      {typeof p.rating === "number" && (
                        <p className="text-sm text-muted-foreground">{t("home.rating")}: {p.rating.toFixed(1)}</p>
                      )}
                      <div className="mt-3">
                        <Link to={getRouteForCategory(p.category)}>
                          <Button variant="outline" size="sm">{getActionLabel(p.category)}</Button>
                        </Link>
                      </div>
                    </div>
                  </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              );
            })()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MapPage;