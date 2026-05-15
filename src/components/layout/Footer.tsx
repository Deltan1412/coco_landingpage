import { Logo } from '@/components/ui/Logo';
import { useLang } from '@/hooks/useLang';

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="shell footer">
      <div className="footer-brand">
        <Logo />
        <span className="footer-copy">{t('footer.copy')}</span>
      </div>
      <div className="links">
        <a href="#course">{t('footer.course')}</a>
        <a href="#products">{t('footer.products')}</a>
        <a href="#roadmap">{t('footer.roadmap')}</a>
        <a href="#trainers">{t('footer.trainers')}</a>
      </div>
    </footer>
  );
}
