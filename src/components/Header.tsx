import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Utensils, 
  Calendar, 
  Map, 
  Ticket, 
  Car, 
  Home,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();

  const navItems = [
    { path: "/", label: t('header.home'), icon: Home },
    { path: "/pontos-turisticos", label: t('header.spots'), icon: MapPin },
    { path: "/restaurantes", label: t('header.restaurants'), icon: Utensils },
    { path: "/hospedagem", label: t('header.stays', { defaultValue: 'Hospedagem' }), icon: Home },
    { path: "/eventos", label: t('header.events'), icon: Calendar },
    { path: "/mapa", label: t('header.map'), icon: Map },
    { path: "/cupons", label: t('header.coupons'), icon: Ticket },
    { path: "/motoristas", label: t('header.drivers'), icon: Car },
  ];
  const desktopNavItems = navItems.filter((i) => i.path !== "/");
  const primaryItems = desktopNavItems.slice(0, 0);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <img src="/floripa-guide.svg" alt="Floripa Guide" className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none text-foreground">{t('header.logo')}</span>
              <span className="text-xs text-muted-foreground">{t('header.tagline')}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
          </nav>

          {/* Language Selector, Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              aria-label={resolvedTheme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="gap-1 px-2 text-xs"
            >
              {resolvedTheme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.222 5.636a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414L4.222 7.05a1 1 0 0 1 0-1.414ZM2 13a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2H2Zm2.222 5.364a1 1 0 0 1 1.414-1.414l1.414 1.414a1 1 0 1 1-1.414 1.414l-1.414-1.414ZM13 22a1 1 0 1 1-2 0v-2a1 1 0 1 1 2 0v2Zm7.364-3.636-1.414-1.414a1 1 0 1 1 1.414-1.414l1.414 1.414a1 1 0 0 1-1.414 1.414ZM20 13a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2h-2Zm-1.636-6.364-1.414-1.414a1 1 0 1 1 1.414-1.414l1.414 1.414a1 1 0 1 1-1.414 1.414Z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M21.64 13a9 9 0 1 1-10.64-10.64A10 10 0 1 0 21.64 13Z"/></svg>
              )}
              {resolvedTheme === "dark" ? "Claro" : "Escuro"}
            </Button>
            <Link to="/parceiros/login">
              <Button variant="outline" size="sm" className="h-9 px-3">
                Login
              </Button>
            </Link>
            <Link to="/parceiros">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Ser um parceiro
              </Button>
            </Link>
            <Link to="/roteiro">
              <Button className="bg-gradient-sunset hover:opacity-90">
                {t('header.createItinerary')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen ? true : false}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav id="mobile-navigation" className="lg:hidden py-4 border-t border-border animate-fade-in" role="navigation" aria-label={t('header.mobileNav', { defaultValue: 'Navegação móvel' })}>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full gap-2 justify-start"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <div className="col-span-2">
                <LanguageSelector />
              </div>
              <Button
                variant="ghost"
                className="col-span-2 w-full"
                aria-label={resolvedTheme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              >
                {resolvedTheme === "dark" ? "Tema claro" : "Tema escuro"}
              </Button>
              <Link
                to="/roteiro"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2"
              >
                <Button className="w-full bg-gradient-sunset hover:opacity-90">
                  {t('header.createItinerary')}
                </Button>
              </Link>
              <Link
                to="/parceiros"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2"
              >
                <Button className="w-full" variant="outline">
                  Ser um parceiro
                </Button>
              </Link>
            </div>
          </nav>
        )}
        <nav
          className="hidden lg:block sticky top-16 z-40 border-t border-border bg-background/95 backdrop-blur-sm shadow-sm"
          role="navigation"
          aria-label={t('header.quickLinks', { defaultValue: 'Links rápidos' })}
        >
          <div className="container mx-auto px-4">
            <div className="overflow-x-auto">
              <div className="mx-auto flex items-center justify-center gap-0 whitespace-nowrap py-2">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      aria-current={isActive ? "page" : undefined}
                      className={`${idx > 0 ? "border-l border-border pl-4 ml-4" : ""} text-sm text-black dark:text-white hover:text-primary`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
