import { Link } from "react-router-dom";
import { MapPin, Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <img src="/floripa-guide.svg" alt="Floripa Guide" className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-foreground">Floripa Guide Pro</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pontos-turisticos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('header.spots')}
                </Link>
              </li>
              <li>
                <Link to="/restaurantes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('header.restaurants')}
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('header.events')}
                </Link>
              </li>
              <li>
                <Link to="/mapa" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('header.map')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.forBusinesses')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/painel" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.partnerPanel')}
                </Link>
              </li>
              <li>
                <Link to="/parceiros" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ser um parceiro
                </Link>
              </li>
              <li>
                <Link to="/parceiros" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.plans')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                contato@floripaguide.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                (48) 99999-9999
              </li>
              <li className="flex gap-3 mt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Floripa Guide Pro. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
