import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, Copy } from "lucide-react";
import { couponsData } from "./Cupons";
import { toast } from "@/hooks/use-toast";

const CupomDetalhe = () => {
  const { t } = useTranslation();
  const params = useParams();
  const id = Number(params.id);
  const c = couponsData.find((x) => x.id === id);

  if (!c) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">{t("coupons.title")}</h1>
        <p className="text-muted-foreground">{t("common.notFound", { defaultValue: "Item não encontrado" })}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{c.title}</h1>
          <p className="text-muted-foreground">{c.business}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="relative col-span-2 h-40 md:h-64 rounded shadow-md overflow-hidden">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge variant="secondary">
                  <Tag className="w-3 h-3 mr-1" />{t("coupons.discount")}: {c.discount}
                </Badge>
              </div>
            </div>
            <div className="grid gap-2 col-span-2 md:col-span-1 grid-cols-2 md:grid-rows-2">
              {[c.image, c.image].map((src, i) => (
                <button key={i} className="h-20 md:h-32 rounded shadow overflow-hidden">
                  <img src={src} alt={`foto ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="p-0 md:p-2">
            <p className="text-muted-foreground mb-4">{c.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("coupons.code")}: {c.code}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(c.code);
                    toast({ title: t("coupons.copiedTitle", { defaultValue: "Código copiado" }), description: t("coupons.copiedDesc", { defaultValue: c.code }) });
                  }}
                >
                  <Copy className="w-3 h-3 md:w-4 md:h-4 mr-1" />{t("coupons.copy")}
                </Button>
                <Button size="sm" variant="default" className="h-9 px-3 text-xs md:h-11 md:px-8 md:text-sm">{t("coupons.redeem")}</Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{t("coupons.validUntil", { date: c.validUntil })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CupomDetalhe;