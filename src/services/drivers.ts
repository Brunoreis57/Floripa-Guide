export type Driver = {
  id: string;
  name: string;
  type: "Uber" | "4x4" | "van" | "transfer" | "passeio";
  avg_price: string;
  whatsapp: string;
  rating: number;
  areas_served: string[];
  photo_url?: string;
};

export async function listDrivers(): Promise<Driver[]> {
  return [
    {
      id: "drv-1",
      name: "Carlos Silva",
      type: "Uber",
      avg_price: "R$ 40",
      whatsapp: "5548999991111",
      rating: 4.8,
      areas_served: ["Centro", "Lagoa", "Campeche"],
      photo_url: undefined,
    },
    {
      id: "drv-2",
      name: "Ana Souza",
      type: "van",
      avg_price: "R$ 120",
      whatsapp: "5548999992222",
      rating: 4.6,
      areas_served: ["Ingleses", "Canasvieiras", "Jurerê"],
      photo_url: undefined,
    },
    {
      id: "drv-3",
      name: "Rafael Costa",
      type: "transfer",
      avg_price: "R$ 150",
      whatsapp: "5548999993333",
      rating: 4.7,
      areas_served: ["Aeroporto", "Centro", "Lagoa"],
      photo_url: undefined,
    },
    {
      id: "drv-4",
      name: "Joana Pereira",
      type: "4x4",
      avg_price: "R$ 200",
      whatsapp: "5548999994444",
      rating: 4.9,
      areas_served: ["Lagoinha do Leste", "Saquinho", "Pântano do Sul"],
      photo_url: undefined,
    },
    {
      id: "drv-5",
      name: "Miguel Andrade",
      type: "passeio",
      avg_price: "R$ 180",
      whatsapp: "5548999995555",
      rating: 4.5,
      areas_served: ["Ilha do Campeche", "Praia Mole", "Barra da Lagoa"],
      photo_url: undefined,
    },
  ];
}