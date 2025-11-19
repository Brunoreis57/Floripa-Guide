import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Camera, Percent, PencilLine, MousePointerClick, Star, Crown } from "lucide-react";
import { auth } from "@/services/auth";

type PartnerType = "restaurante" | "passeio" | "motorista";
type PlanType = "free" | "destaque" | "premium";

interface Coupon {
  code: string;
  description: string;
  discount: number;
}

const Painel = () => {
  const { t } = useTranslation();

  const [partnerType, setPartnerType] = useState<PartnerType>("restaurante");
  const [plan, setPlan] = useState<PlanType>("free");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [newCoupon, setNewCoupon] = useState<Coupon>({ code: "", description: "", discount: 10 });
  const [clicks, setClicks] = useState({ hoje: 0, semana: 12, mes: 140 });
  const [paymentOpen, setPaymentOpen] = useState(false);
  const session = auth.getSession();
  const subscription = session ? auth.getSubscription(session.user_id) : null;
  const paymentLinks: Record<PlanType, string> = {
    free: import.meta.env.VITE_PAYMENT_LINK_FREE ?? "",
    destaque: import.meta.env.VITE_PAYMENT_LINK_DESTAQUE ?? "",
    premium: import.meta.env.VITE_PAYMENT_LINK_PREMIUM ?? "",
  };

  const onPhotosSelected = (files: FileList | null) => {
    if (!files) return;
    const readers = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.readAsDataURL(file);
        }),
    );
    Promise.all(readers).then((urls) => setPhotos((prev) => [...prev, ...urls]));
  };

  const addCoupon = () => {
    if (!newCoupon.code.trim()) return;
    setCoupons((prev) => [...prev, newCoupon]);
    setNewCoupon({ code: "", description: "", discount: 10 });
  };

  const removeCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  const simulateClick = () => {
    setClicks((c) => ({ ...c, hoje: c.hoje + 1, semana: c.semana + 1, mes: c.mes + 1 }));
  };

  const planLabel = (p: PlanType) =>
    p === "free"
      ? t("plans.free", { defaultValue: "Free" })
      : p === "destaque"
      ? t("plans.featured", { defaultValue: "Destaque" })
      : t("plans.premium", { defaultValue: "Premium" });

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t("partner.panelTitle", { defaultValue: "Área do Parceiro" })}</h1>
          <p className="text-muted-foreground mt-1">{t("partner.subtitle", { defaultValue: "Monetização para restaurantes, passeios e motoristas" })}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Assinatura</CardTitle>
            </CardHeader>
            <CardContent>
              {subscription ? (
                <div className="text-sm space-y-2">
                  <div><span className="font-semibold">Plano:</span> {subscription.plan}</div>
                  <div><span className="font-semibold">Status:</span> {subscription.status}</div>
                  <Button variant="outline" size="sm" onClick={() => setPaymentOpen(true)}>Trocar de plano</Button>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Nenhuma assinatura vinculada</div>
              )}
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5" />{t("partner.registerCompany", { defaultValue: "Cadastrar empresa" })}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">{t("partner.type", { defaultValue: "Tipo" })}</label>
                  <div className="mt-1 flex gap-2">
                    {["restaurante", "passeio", "motorista"].map((tpe) => (
                      <Button
                        key={tpe}
                        variant={partnerType === tpe ? "default" : "outline"}
                        size="sm"
                        className="h-9"
                        onClick={() => setPartnerType(tpe as PartnerType)}
                      >
                        {tpe}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">{t("partner.companyName", { defaultValue: "Nome da empresa" })}</label>
                  <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder={t("partner.companyPlaceholder", { defaultValue: "Ex.: Restaurante da Lagoa" }) as string} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">{t("partner.address", { defaultValue: "Endereço" })}</label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t("partner.addressPlaceholder", { defaultValue: "Rua Exemplo, 123" }) as string} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground">{t("partner.description", { defaultValue: "Descrição" })}</label>
                  <textarea
                    className="mt-1 w-full rounded border border-border p-2 text-sm"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("partner.descriptionPlaceholder", { defaultValue: "Conte sobre sua empresa, diferenciais e serviços." }) as string}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-muted-foreground flex items-center gap-2"><Camera className="w-4 h-4" />{t("partner.photos", { defaultValue: "Fotos" })}</label>
                  <input type="file" multiple accept="image/*" className="mt-1" onChange={(e) => onPhotosSelected(e.target.files)} />
                  <div className="mt-3 grid grid-cols-3 md:grid-cols-5 gap-2">
                    {photos.map((src, i) => (
                      <div key={i} className="h-24 rounded overflow-hidden border border-border">
                        <img src={src} alt={`foto-${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Button size="sm" className="h-9 px-3">{t("partner.save", { defaultValue: "Salvar cadastro" })}</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5" />{t("partner.planSelection", { defaultValue: "Escolher plano" })}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  {["free", "destaque", "premium"].map((p) => (
                    <Button key={p} size="sm" variant={plan === p ? "default" : "outline"} className="h-9" onClick={() => setPlan(p as PlanType)}>
                      {planLabel(p as PlanType)}
                    </Button>
                  ))}
                </div>
                <div className="border border-border rounded p-3 text-sm">
                  {plan === "free" && (
                    <ul className="space-y-1">
                      <li><Badge variant="secondary">Free</Badge> {t("plans.freeDesc", { defaultValue: "Aparece na lista" })}</li>
                    </ul>
                  )}
                  {plan === "destaque" && (
                    <ul className="space-y-1">
                      <li><Badge variant="secondary">Destaque</Badge> {t("plans.featuredDesc", { defaultValue: "Aparece no topo da categoria" })}</li>
                    </ul>
                  )}
                  {plan === "premium" && (
                    <ul className="space-y-1">
                      <li><Badge variant="secondary">Premium</Badge> {t("plans.premiumDesc1", { defaultValue: "Topo da categoria" })}</li>
                      <li>{t("plans.premiumDesc2", { defaultValue: "Destaque na home" })}</li>
                      <li>{t("plans.premiumDesc3", { defaultValue: "Preferência no roteiro automático" })}</li>
                    </ul>
                  )}
                </div>
                <Button size="sm" className="h-9 px-3" onClick={() => setPaymentOpen(true)}>
                  <Crown className="w-4 h-4 mr-2" />{t("partner.pay", { defaultValue: "Prosseguir pagamento" })}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Percent className="w-5 h-5" />{t("partner.coupons", { defaultValue: "Cupons" })}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="text-sm text-muted-foreground">{t("partner.couponCode", { defaultValue: "Código" })}</label>
                  <Input value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">{t("partner.couponDesc", { defaultValue: "Descrição" })}</label>
                  <Input value={newCoupon.description} onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">{t("partner.discount", { defaultValue: "Desconto (%)" })}</label>
                  <Input type="number" min={1} max={90} value={newCoupon.discount} onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })} />
                </div>
                <div className="md:col-span-3">
                  <Button size="sm" className="h-9 px-3" onClick={addCoupon}>{t("partner.addCoupon", { defaultValue: "Adicionar cupom" })}</Button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {coupons.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("partner.noCoupons", { defaultValue: "Nenhum cupom adicionado" })}</p>
                ) : (
                  coupons.map((c) => (
                    <div key={c.code} className="flex items-center justify-between border border-border rounded p-3">
                      <div>
                        <div className="font-semibold">{c.code} • {c.discount}%</div>
                        <div className="text-sm text-muted-foreground">{c.description}</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => removeCoupon(c.code)}>{t("common.remove", { defaultValue: "Remover" })}</Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MousePointerClick className="w-5 h-5" />{t("partner.clicks", { defaultValue: "Cliques" })}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><Badge variant="secondary">Hoje</Badge><span className="font-semibold">{clicks.hoje}</span></div>
                <div className="flex items-center gap-2"><Badge variant="secondary">Semana</Badge><span className="font-semibold">{clicks.semana}</span></div>
                <div className="flex items-center gap-2"><Badge variant="secondary">Mês</Badge><span className="font-semibold">{clicks.mes}</span></div>
                <Button size="sm" className="h-9 px-3" onClick={simulateClick}>{t("partner.simulateClick", { defaultValue: "Simular clique" })}</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
          <DialogContent className="max-w-lg">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{t("partner.paymentTitle", { defaultValue: "Pagamento" })}</h2>
              <p className="text-sm text-muted-foreground mb-4">{t("partner.paymentDesc", { defaultValue: "Checkout com link de pagamento." })}</p>
              <div className="border border-border rounded p-3 mb-3">
                <div className="font-semibold">{t("partner.selectedPlan", { defaultValue: "Plano selecionado" })}: {planLabel(plan)}</div>
                {plan === "free" ? (
                  <div className="text-sm text-muted-foreground">{t("partner.paymentFree", { defaultValue: "Plano Free não requer pagamento." })}</div>
                ) : paymentLinks[plan] ? (
                  <div className="mt-3">
                    <a href={paymentLinks[plan]} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="h-9 px-3">{t("partner.goToCheckout", { defaultValue: "Ir para checkout" })}</Button>
                    </a>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">{t("partner.paymentConfigure", { defaultValue: "Configure o link de pagamento nas variáveis de ambiente." })}</div>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="h-9 px-3" onClick={() => setPaymentOpen(false)}>{t("common.close", { defaultValue: "Fechar" })}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Painel;