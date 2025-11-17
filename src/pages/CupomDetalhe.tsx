import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
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

        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge variant="secondary">
                <Tag className="w-3 h-3 mr-1" />{t("coupons.discount")}: {c.discount}
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <p className="text-muted-foreground mb-4">{c.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t("coupons.code")}: {c.code}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(c.code);
                    toast({ title: t("coupons.copiedTitle", { defaultValue: "Código copiado" }), description: t("coupons.copiedDesc", { defaultValue: c.code }) });
                  }}
                >
                  <Copy className="w-3 h-3 mr-1" />{t("coupons.copy")}
                </Button>
                <Button size="sm" variant="default">{t("coupons.redeem")}</Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{t("coupons.validUntil", { date: c.validUntil })}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CupomDetalhe;