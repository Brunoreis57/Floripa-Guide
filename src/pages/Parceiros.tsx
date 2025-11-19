import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Crown, Star, Rocket, Info, CheckCircle2 } from "lucide-react";

const plans = [
  {
    id: "free",
    title: "Plano Free",
    price: "R$ 0/mês",
    features: ["Aparece na listagem geral", "Link para WhatsApp", "1 categoria"],
  },
  {
    id: "destaque",
    title: "Plano Destaque",
    price: "R$ 59/mês",
    features: ["Aparece em destaque na categoria", "Até 3 categorias", "3 cupons de desconto", "Destaque em algumas buscas"],
  },
  {
    id: "premium",
    title: "Plano Premium",
    price: "R$ 99/mês",
    features: ["Destaque na home", "Roteiros automáticos", "Cupons ilimitados", "Relatório de cliques", "Suporte prioritário"],
  },
];

const faq = [
  { q: "Posso cancelar quando quiser?", a: "Sim. Você tem total autonomia para cancelar sua assinatura a qualquer momento." },
  { q: "Paguei, em quanto tempo apareço no site?", a: "Após confirmação do pagamento, a ativação é automática e seu negócio passa a aparecer conforme o plano." },
  { q: "Como recebo os clientes?", a: "Você receberá contatos via WhatsApp, e poderá usar cupons e links para aumentar conversões." },
  { q: "Tenho contrato de fidelidade?", a: "Não. Os planos são mensais e sem fidelidade." },
];

const Parceiros = () => {
  const { t } = useTranslation();
  const goTo = (plan?: string) => {
    const url = plan ? `/parceiros/cadastro?plan=${plan}` : "/parceiros/cadastro";
    window.location.href = url;
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Seja um parceiro do Floripa Guide Pro</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Apareça para milhares de turistas que visitam Florianópolis todos os meses. Divulgue seu restaurante, passeio, hospedagem ou serviço diretamente para quem está na ilha.
          </p>
          <div className="mt-6">
            <Button size="lg" className="bg-gradient-primary" onClick={() => goTo()}>
              Quero cadastrar meu negócio
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Como funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" />Cadastre seu negócio</CardTitle>
            </CardHeader>
            <CardContent>Crie seu perfil com dados de contato, descrição e fotos.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5" />Escolha um plano</CardTitle>
            </CardHeader>
            <CardContent>Selecione Free, Destaque ou Premium conforme seus objetivos.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Rocket className="w-5 h-5" />Comece a receber clientes</CardTitle>
            </CardHeader>
            <CardContent>Seu negócio aparece nas páginas e buscas para turistas.</CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Para quem é</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {["Restaurantes e bares", "Passeios de barco, trilhas, tours", "Motoristas (Uber, 4x4, van, transfer)", "Hospedagens e pousadas", "Serviços para turistas"].map((s) => (
            <Card key={s} className="p-4 text-center"><span className="text-sm">{s}</span></Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Planos e valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <Card key={p.id} className="border-2 hover:border-primary/30 transition h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Crown className="w-5 h-5" />{p.title}</CardTitle>
                <div className="text-xl font-bold text-foreground mt-2">{p.price}</div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />{f}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <Button className="w-full" onClick={() => goTo(p.id)}>Quero este plano</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">FAQ – Perguntas Frequentes</h2>
        <div className="space-y-3">
          {faq.map((item) => (
            <Card key={item.q}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Info className="w-5 h-5" />{item.q}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.a}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Parceiros;