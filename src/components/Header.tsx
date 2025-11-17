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
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { path: "/", label: t('header.home'), icon: Home },
    { path: "/pontos-turisticos", label: t('header.spots'), icon: MapPin },
    { path: "/restaurantes", label: t('header.restaurants'), icon: Utensils },
    { path: "/eventos", label: t('header.events'), icon: Calendar },
    { path: "/mapa", label: t('header.map'), icon: Map },
    { path: "/cupons", label: t('header.coupons'), icon: Ticket },
    { path: "/motoristas", label: t('header.drivers'), icon: Car },
  ];

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
            {navItems.map((item) => {
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

          {/* Language Selector & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
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
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
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
              <Link
                to="/roteiro"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2"
              >
                <Button className="w-full bg-gradient-sunset hover:opacity-90">
                  {t('header.createItinerary')}
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
