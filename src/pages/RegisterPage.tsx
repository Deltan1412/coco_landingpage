import { Link } from 'react-router-dom';
import { RegisterForm } from '@/components/sections';
import { LangFab } from '@/components/ui/LangFab';
import { useLang } from '@/hooks/useLang';

export function RegisterPage() {
  const { t } = useLang();
  return (
    <>
      <LangFab />
      <div className="register-page">
        <header className="register-page-header shell">
          <Link to="/#register" className="register-page-back">
            ← {t('form.back')}
          </Link>
        </header>
        <RegisterForm />
      </div>
    </>
  );
}
