import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/services/auth";

const maskWhatsapp = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 11) return d.replace(/(\d{2})(\d{5})(\d{4})/, "+55 ($1) $2-$3");
  return d;
};

const ParceirosCadastro = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [plan, setPlan] = useState<"free" | "destaque" | "premium">("free");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    type: "restaurante",
    city: "",
    whatsapp: "",
    email: "",
    password: "",
    confirm: "",
    instagram: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    const p = params.get("plan");
    if (p === "free" || p === "destaque" || p === "premium") setPlan(p);
  }, [params]);

  const validate = () => {
    if (!form.name || !form.company || !form.city || !form.whatsapp || !form.email || !form.password || !form.confirm) {
      return "Preencha todos os campos obrigatórios";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "E-mail inválido";
    }
    if (form.password.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres";
    }
    if (form.password !== form.confirm) {
      return "As senhas não conferem";
    }
    return "";
  };

  const submit = () => {
    setError("");
    setSuccess("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    try {
      auth.registerPartner({
        name: form.name,
        email: form.email,
        password: form.password,
        business_name: form.company,
        type: form.type,
        city: form.city,
        whatsapp: form.whatsapp.replace(/\D/g, ""),
        instagram: form.instagram || undefined,
        website: form.website || undefined,
        description: form.description || undefined,
        plan,
      });
      setSuccess("Cadastro realizado com sucesso! Agora você já pode acessar sua Área do Parceiro.");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro no cadastro";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Cadastro do parceiro</h1>
          <p className="text-muted-foreground">Preencha seus dados para divulgar seu negócio</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Plano selecionado: {plan === "free" ? "Free" : plan === "destaque" ? "Destaque" : "Premium"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Nome completo *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Nome da empresa *</label>
                <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Tipo de negócio *</label>
                <select className="w-full border border-border rounded p-2 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {['restaurante','passeio','motorista','hospedagem','outro'].map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Cidade / bairro *</label>
                <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">WhatsApp *</label>
                <Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: maskWhatsapp(e.target.value) })} placeholder="+55 (48) 9XXXX-XXXX" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">E-mail *</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Senha *</label>
                <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Confirmação de senha *</label>
                <Input type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Instagram (opcional)</label>
                <Input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Site (opcional)</label>
                <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-muted-foreground">Descrição curta</label>
                <textarea className="w-full rounded border border-border p-2 text-sm" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
            </div>

            {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
            {success && (
              <div className="mt-4 text-green-700 text-sm">
                {success}
                <div className="mt-3">
                  <Button onClick={() => (window.location.href = "/parceiros/login")}>Ir para login do parceiro</Button>
                </div>
              </div>
            )}

            {!success && (
              <div className="mt-6">
                <Button className="w-full" onClick={submit}>Concluir cadastro</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParceirosCadastro;