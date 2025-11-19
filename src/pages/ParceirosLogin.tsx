import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/services/auth";
import { Navigate } from "react-router-dom";

const ParceirosLogin = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const session = auth.getSession();

  if (session?.role === "partner") {
    return <Navigate to="/painel" replace />;
  }

  const submit = () => {
    setError("");
    try {
      const user = auth.login(email, password);
      if (user.role !== "partner") {
        setError("Acesso negado: usuário não é parceiro");
        return;
      }
      window.location.href = "/painel";
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Falha no login";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login do parceiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">E-mail</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Senha</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button className="w-full" onClick={submit}>Entrar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParceirosLogin;