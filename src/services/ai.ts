export type ItineraryPreferences = {
  days: number;
  budget: "baixo" | "medio" | "alto";
  types: ("praias" | "trilhas" | "restaurantes" | "baladas")[];
  group: "familia" | "casal" | "amigos";
};

export type ItineraryItem = {
  time: string;
  title: string;
  type: string;
  location?: string;
  description?: string;
  transport?: string;
};

export type ItineraryDay = {
  day: number;
  date?: string;
  items: ItineraryItem[];
};

export type AIItinerary = {
  itinerary: ItineraryDay[];
  transport?: { summary?: string; suggestions?: string[] };
  weather?: { summary?: string; daily?: { day: number; forecast: string }[] };
  recommendations?: { title: string; reason: string; link?: string }[];
  pdf?: { suggested_filename?: string };
};

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export async function generateItinerary(prefs: ItineraryPreferences): Promise<AIItinerary> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY não configurada. Defina VITE_OPENAI_API_KEY ou use um proxy backend.");
  }

  const system = `Você é um planejador de viagens para Florianópolis. Gere um roteiro diário detalhado com horários, locais, sugestões de transporte e clima aproximado. Responda APENAS em JSON, seguindo o esquema exato abaixo.`;

  const schema = {
    itinerary: [
      {
        day: 1,
        date: "YYYY-MM-DD",
        items: [
          { time: "08:00", title: "Praia da Joaquina", type: "praia", location: "Praia da Joaquina", description: "…", transport: "…" },
        ],
      },
    ],
    transport: { summary: "…", suggestions: ["Uber", "Aluguel de carro"] },
    weather: { summary: "…", daily: [{ day: 1, forecast: "…" }] },
    recommendations: [{ title: "…", reason: "…", link: "…" }],
    pdf: { suggested_filename: "roteiro-floripa.pdf" },
  };

  const user = `Preferências:\n- Dias: ${prefs.days}\n- Orçamento: ${prefs.budget}\n- Tipos: ${prefs.types.join(", ")}\n- Grupo: ${prefs.group}\n\nRegras:\n- Use locais de Floripa realistas.\n- Distribua por dia com manhã/tarde/noite.\n- Incluir tempo estimado e deslocamento quando fizer sentido.\n- Clima: resumo aproximado para época atual (sem dados externos).\n- Transporte: opções práticas (Uber, carro, ônibus, bike).\n- Recomendações personalizadas com motivo.\n- Retorne APENAS JSON seguindo o esquema.`;

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: `${user}\n\nEsquema de exemplo:\n${JSON.stringify(schema)}` },
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Falha na IA: ${res.status} ${txt}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  try {
    const parsed = JSON.parse(content);
    return parsed as AIItinerary;
  } catch (e) {
    throw new Error("Resposta da IA não é JSON válido.");
  }
}