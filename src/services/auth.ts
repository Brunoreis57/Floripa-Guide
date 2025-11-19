type Role = "partner" | "user";

type User = { id: string; name: string; email: string; password: string; role: Role };
type Partner = { id: string; user_id: string; business_name: string; type: string; city: string; whatsapp: string; instagram?: string; website?: string; description?: string; status: "pendente" | "ativo" };
type Subscription = { id: string; user_id: string; plan: "free" | "destaque" | "premium"; status: "ativo" | "pendente" | "cancelado"; start_date: string; end_date?: string };

const LS_USERS = "fg_users";
const LS_PARTNERS = "fg_partners";
const LS_SUBS = "fg_subscriptions";
const LS_SESSION = "fg_session";

const read = <T>(key: string, def: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : def;
  } catch {
    return def;
  }
};

const write = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value));

export const auth = {
  registerPartner: (payload: {
    name: string;
    email: string;
    password: string;
    business_name: string;
    type: string;
    city: string;
    whatsapp: string;
    instagram?: string;
    website?: string;
    description?: string;
    plan: "free" | "destaque" | "premium";
  }) => {
    const users = read<User[]>(LS_USERS, []);
    const partners = read<Partner[]>(LS_PARTNERS, []);
    const subs = read<Subscription[]>(LS_SUBS, []);

    if (users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
      throw new Error("E-mail já cadastrado");
    }

    const user_id = crypto.randomUUID();
    const partner_id = crypto.randomUUID();
    const sub_id = crypto.randomUUID();

    const user: User = { id: user_id, name: payload.name, email: payload.email, password: payload.password, role: "partner" };
    const partner: Partner = {
      id: partner_id,
      user_id,
      business_name: payload.business_name,
      type: payload.type,
      city: payload.city,
      whatsapp: payload.whatsapp,
      instagram: payload.instagram,
      website: payload.website,
      description: payload.description,
      status: "pendente",
    };
    const subscription: Subscription = {
      id: sub_id,
      user_id,
      plan: payload.plan,
      status: payload.plan === "free" ? "ativo" : "pendente",
      start_date: new Date().toISOString(),
    };

    write(LS_USERS, [...users, user]);
    write(LS_PARTNERS, [...partners, partner]);
    write(LS_SUBS, [...subs, subscription]);

    return { user, partner, subscription };
  },

  login: (email: string, password: string) => {
    const users = read<User[]>(LS_USERS, []);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error("Credenciais inválidas");
    write(LS_SESSION, { user_id: user.id, role: user.role });
    return user;
  },

  logout: () => {
    localStorage.removeItem(LS_SESSION);
  },

  getSession: () => read<{ user_id: string; role: Role } | null>(LS_SESSION, null),

  getSubscription: (user_id: string) => {
    const subs = read<Subscription[]>(LS_SUBS, []);
    return subs.find((s) => s.user_id === user_id) || null;
  },
};

export type { User, Partner, Subscription };