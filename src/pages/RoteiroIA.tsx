import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar as CalIcon, Clock, FileDown, Bus, ChevronLeft, ChevronRight } from "lucide-react";
import type { AIItinerary, ItineraryPreferences } from "@/services/ai";
import { spotsData } from "./PontosTuristicos";
import { restaurantsData } from "./Restaurantes";
import { eventsData } from "./Eventos";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

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

const getMarker = (name: string): [number, number] | null => {
  return (
    spotCoords[name] ||
    restaurantCoords[name] ||
    eventCoords[name] ||
    null
  );
};

const RoteiroIA = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState(3);
  type Budget = ItineraryPreferences["budget"];
  type TypeOpt = ItineraryPreferences["types"][number];
  type Group = ItineraryPreferences["group"];
  const [budget, setBudget] = useState<Budget>("medio");
  const [types, setTypes] = useState<TypeOpt[]>(["praias", "restaurantes"]);
  const [group, setGroup] = useState<Group>("casal");

  const [data, setData] = useState<AIItinerary | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  const spotLabel = (key: keyof typeof spotCoords | string) => {
    if (key === "joaquina") return "Praia da Joaquina";
    if (key === "praiaMole") return "Praia Mole";
    if (key === "lagoinhaLeste") return "Lagoinha do Leste";
    if (key === "morroCruz") return "Morro da Cruz";
    if (key === "campeche") return "Praia do Campeche";
    if (key === "costaLagoa") return "Costa da Lagoa";
    return String(key);
  };

  const buildItinerary = (prefs: ItineraryPreferences): AIItinerary => {
    const pickSpots = (cat: "praia" | "trilha") => spotsData.filter((s) => s.category === cat);
    const pickRests = () => {
      const planOrder: Record<string, number> = { premium: 0, destaque: 1, free: 2 };
      return restaurantsData.slice().sort((a, b) => planOrder[a.plan] - planOrder[b.plan]);
    };
    const pickEvents = () => eventsData.filter((e) => e.category.toLowerCase().includes("bal"));

    const transportSummary = prefs.budget === "baixo" ? "Ônibus e caminhadas" : prefs.budget === "medio" ? "Uber e ônibus" : "Aluguel de carro";
    const transportList = prefs.budget === "alto" ? ["Aluguel de carro", "Uber", "Bike"] : prefs.budget === "medio" ? ["Uber", "Ônibus"] : ["Ônibus", "Caminhada"];

    const daysArr: { day: number; date?: string; items: { time: string; title: string; type: string; location?: string; description?: string; transport?: string }[] }[] = [];
    const beachList = pickSpots("praia");
    const trailList = pickSpots("trilha");
    const restList = pickRests();
    const baladaList = pickEvents();

    for (let d = 1; d <= prefs.days; d++) {
      const items: { time: string; title: string; type: string; location?: string; description?: string; transport?: string }[] = [];

      if (prefs.types.includes("praias") && beachList.length) {
        const s = beachList[(d - 1) % beachList.length];
        items.push({
          time: "08:00",
          title: spotLabel(s.nameKey),
          type: "praia",
          location: s.nameKey,
          description: s.description,
          transport: transportSummary,
        });
      }

      if (prefs.types.includes("trilhas") && trailList.length) {
        const s = trailList[(d - 1) % trailList.length];
        items.push({
          time: "11:00",
          title: s.nameKey === "lagoinhaLeste" ? "Trilha da Lagoinha do Leste" : s.nameKey === "costaLagoa" ? "Trilha Costa da Lagoa" : spotLabel(s.nameKey),
          type: "trilha",
          location: s.nameKey,
          description: s.description,
          transport: transportSummary,
        });
      }

      if (prefs.types.includes("restaurantes") && restList.length) {
        const r = restList[(d - 1) % restList.length];
        items.push({
          time: "13:00",
          title: r.name,
          type: "restaurante",
          location: r.name,
          description: r.description,
          transport: "Uber ou caminhada",
        });
      }

      if (prefs.types.includes("praias") && beachList.length) {
        const s = beachList[d % beachList.length];
        items.push({
          time: "15:30",
          title: s.nameKey === "morroCruz" ? "Mirante Morro da Cruz" : spotLabel(s.nameKey),
          type: s.category,
          location: s.nameKey,
          description: s.description,
          transport: transportSummary,
        });
      }

      if (prefs.types.includes("baladas") && baladaList.length) {
        const e = baladaList[(d - 1) % baladaList.length];
        items.push({
          time: "21:00",
          title: e.nameKey === "festaLagoa" ? "Festa na Lagoa" : e.nameKey,
          type: "balada",
          location: e.nameKey,
          description: e.description,
          transport: "Uber",
        });
      }

      daysArr.push({ day: d, items });
    }

    const weather = { summary: "Clima ameno e variável", daily: Array.from({ length: prefs.days }).map((_, i) => ({ day: i + 1, forecast: "Sol e nuvens" })) };
    const recs = restList.slice(0, 4).map((r) => ({ title: r.name, reason: "Boa avaliação e acesso fácil" }));

    return { itinerary: daysArr, transport: { summary: transportSummary, suggestions: transportList }, weather, recommendations: recs, pdf: { suggested_filename: "roteiro-floripa.pdf" } };
  };

  const getItemAddress = (it: { type: string; title: string; location?: string }) => {
    if (it.type === "restaurante") {
      const r = restaurantsData.find((x) => x.name === (it.location || it.title));
      return r?.address;
    }
    if (it.type === "balada") {
      const e = eventsData.find((x) => x.nameKey === (it.location || it.title));
      return e?.location;
    }
    return undefined;
  };

  const onSubmit = () => {
    setIsPending(true);
    const safeDays = Number.isFinite(days) && days >= 1 ? days : 1;
    const safeTypes: TypeOpt[] = types.length ? types : (["praias", "restaurantes"] as TypeOpt[]);
    const result = buildItinerary({ days: safeDays, budget, types: safeTypes, group });
    setData(result);
    setCurrentDay(0);
    setIsPending(false);
  };

  const markers = (() => {
    const arr: { id: string; name: string; coords: [number, number]; type: string; address?: string }[] = [];
    if (data?.itinerary && data.itinerary[currentDay]) {
      data.itinerary[currentDay].items.forEach((it, ii) => {
        const m = getMarker(it.title) || (it.location ? getMarker(it.location) : null);
        if (m) arr.push({ id: `${currentDay}-${ii}`, name: it.title, coords: m, type: it.type, address: getItemAddress(it) });
      });
    }
    return arr;
  })();

  const routeLatLngs = (() => {
    const pts: L.LatLngExpression[] = [];
    if (data?.itinerary && data.itinerary[currentDay]) {
      data.itinerary[currentDay].items.forEach((it) => {
        const m = getMarker(it.title) || (it.location ? getMarker(it.location) : null);
        if (m) pts.push(m as L.LatLngExpression);
      });
    }
    return pts;
  })();

  const getTypeIcon = (type: string) => {
    const bg = type === "praia" ? "#0ea5e9" : type === "trilha" ? "#10b981" : type === "restaurante" ? "#ef4444" : type === "balada" ? "#8b5cf6" : "#64748b";
    const label = type === "praia" ? "🏖" : type === "trilha" ? "🥾" : type === "restaurante" ? "🍽" : type === "balada" ? "🎉" : "•";
    return L.divIcon({
      className: "",
      html: `<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${bg};color:#fff;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${label}</span>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });
  };

  const focusOn = (coords: [number, number]) => {
    if (mapInstance) {
      mapInstance.flyTo(coords as L.LatLngExpression, 14, { duration: 0.6 });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Roteiro Automático (IA)</h1>
          <p className="text-muted-foreground">Monte seu roteiro inteligente para Floripa</p>
        </div>

        <Card className="mb-8 print:hidden">
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Dias</label>
                <Input type="number" min={1} max={30} value={days} onChange={(e) => {
                  const v = Number(e.target.value);
                  setDays(Number.isFinite(v) && v >= 1 ? v : 1);
                }} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Orçamento</label>
                <div className="flex flex-wrap gap-2">
                  {(["baixo", "medio", "alto"] as Budget[]).map((b) => (
                    <Button key={b} variant={budget === b ? "default" : "outline"} onClick={() => setBudget(b)} className="whitespace-nowrap">{b}</Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Tipos</label>
                <div className="flex flex-wrap gap-2">
                  {(["praias", "trilhas", "restaurantes", "baladas"] as TypeOpt[]).map((tp) => {
                    const active = types.includes(tp);
                    return (
                      <Button
                        key={tp}
                        variant={active ? "default" : "outline"}
                        onClick={() => setTypes((prev) => (active ? prev.filter((x) => x !== tp) : [...prev, tp]))}
                        className="whitespace-nowrap"
                      >
                        {tp}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Grupo</label>
                <div className="flex flex-wrap gap-2">
                  {(["familia", "casal", "amigos"] as Group[]).map((g) => (
                    <Button key={g} variant={group === g ? "default" : "outline"} onClick={() => setGroup(g)} className="whitespace-nowrap">{g}</Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2 print:hidden">
              <Button onClick={onSubmit} disabled={isPending} className="w-full sm:w-auto">Gerar Roteiro</Button>
              <Button variant="outline" onClick={() => window.print()} className="w-full sm:w-auto"><FileDown className="w-4 h-4 mr-2" />PDF</Button>
            </div>

            
          </CardContent>
        </Card>

        {isPending && (
          <Card className="mb-8">
            <CardContent>
              <p className="text-muted-foreground">Gerando roteiro com IA...</p>
            </CardContent>
          </Card>
        )}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="print:hidden">
              <CardHeader>
                <CardTitle>Roteiro Diário</CardTitle>
              </CardHeader>
              <CardContent>
                {data.itinerary[currentDay] && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CalIcon className="w-4 h-4" />
                        <span className="font-semibold">Dia {data.itinerary[currentDay].day}{data.itinerary[currentDay].date ? ` • ${data.itinerary[currentDay].date}` : ""}</span>
                      </div>
                      <div className="flex items-center gap-2 print:hidden">
                        <Button variant="outline" size="sm" onClick={() => setCurrentDay((d) => Math.max(0, d - 1))} disabled={currentDay === 0}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentDay((d) => Math.min((data.itinerary.length - 1), d + 1))} disabled={currentDay >= (data.itinerary.length - 1)}>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {data.itinerary[currentDay].items.map((it, idx) => {
                        const itemCoords = getMarker(it.title) || (it.location ? getMarker(it.location) : null);
                        const itemAddr = getItemAddress(it);
                        return (
                        <div key={idx} className="p-3 border rounded-md break-words">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{it.time}</span>
                            <Badge>{it.type}</Badge>
                          </div>
                          <div className="mt-1 font-semibold text-foreground">{it.title}</div>
                          {it.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{it.location}</span>
                            </div>
                          )}
                          {itemAddr && (
                            <p className="text-xs text-muted-foreground">{itemAddr}</p>
                          )}
                          {itemCoords && (
                            <div className="mt-2">
                              <Button variant="outline" size="sm" className="print:hidden" onClick={() => focusOn(itemCoords)}>
                                <MapPin className="w-4 h-4 mr-2" />Ver no mapa
                              </Button>
                            </div>
                          )}
                          {it.transport && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Bus className="w-4 h-4" />
                              <span>{it.transport}</span>
                            </div>
                          )}
                          {it.description && (
                            <p className="text-sm text-muted-foreground mt-1">{it.description}</p>
                          )}
                        </div>
                      );})}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="hidden print:block lg:col-span-2">
              <CardHeader>
                <CardTitle>Roteiro (Todos os Dias)</CardTitle>
              </CardHeader>
              <CardContent>
                {data.itinerary && (
                  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${data.itinerary.length}, minmax(220px, 1fr))` }}>
                    {data.itinerary.map((day) => (
                      <div key={day.day} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CalIcon className="w-4 h-4" />
                          <span className="font-semibold">Dia {day.day}{day.date ? ` • ${day.date}` : ""}</span>
                        </div>
                        {day.items.map((it, idx) => (
                          <div key={idx} className="p-3 border rounded-md break-words">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{it.time}</span>
                              <Badge>{it.type}</Badge>
                            </div>
                            <div className="mt-1 font-semibold text-foreground">{it.title}</div>
                            {it.location && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{it.location}</span>
                              </div>
                            )}
                            {it.transport && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Bus className="w-4 h-4" />
                                <span>{it.transport}</span>
                              </div>
                            )}
                            {it.description && (
                              <p className="text-sm text-muted-foreground mt-1">{it.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="print:hidden">
              <CardHeader>
                <CardTitle>Mapa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[50vh] md:h-[60vh] rounded overflow-hidden">
                  <MapContainer center={[-27.5945, -48.5477] as L.LatLngExpression} zoom={12} className="h-full w-full" ref={setMapInstance}>
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
                    {routeLatLngs.length >= 2 && (
                      <Polyline positions={routeLatLngs} pathOptions={{ color: "#2563eb", weight: 3, opacity: 0.8 }} />
                    )}
                    {markers.map((m) => (
                      <Marker key={m.id} position={m.coords as L.LatLngExpression} icon={getTypeIcon(m.type) as L.DivIcon}>
                        <Popup>
                          <div className="w-48">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span className="font-semibold">{m.name}</span>
                            </div>
                            {m.address && (
                              <p className="text-xs text-muted-foreground">{m.address}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">Lat: {m.coords[0].toFixed(4)} • Lng: {m.coords[1].toFixed(4)}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transporte</CardTitle>
              </CardHeader>
              <CardContent>
                {data.transport?.summary && (
                  <p className="text-muted-foreground mb-2">{data.transport.summary}</p>
                )}
                <ul className="list-disc pl-6 text-sm">
                  {(data.transport?.suggestions || []).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="print:hidden">
              <CardHeader>
                <CardTitle>Clima</CardTitle>
              </CardHeader>
              <CardContent>
                {data.weather?.summary && (
                  <p className="text-muted-foreground mb-2">{data.weather.summary}</p>
                )}
                <ul className="list-disc pl-6 text-sm">
                  {(data.weather?.daily || []).map((d) => (
                    <li key={d.day}>Dia {d.day}: {d.forecast}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recomendações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(data.recommendations || []).map((r, i) => (
                    <div key={i} className="p-3 border rounded-md">
                      <div className="font-semibold text-foreground">{r.title}</div>
                      <p className="text-sm text-muted-foreground">{r.reason}</p>
                      {r.link && (
                        <a href={r.link} target="_blank" rel="noreferrer" className="text-primary text-sm">Abrir</a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoteiroIA;