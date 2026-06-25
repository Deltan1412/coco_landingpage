import { RegisterForm } from '@/components/sections';
import { LangFab } from '@/components/ui/LangFab';
import { useLang } from '@/hooks/useLang';
import { AI_STUDIO_URL } from '@/constants/links';

export function RegisterPage() {
  const { t } = useLang();
  return (
    <>
      <LangFab />
      <div className="register-page">
        <header className="register-page-header shell">
          <a href={AI_STUDIO_URL} className="register-page-back">
            ← {t('form.back')}
          </a>
        </header>
        <RegisterForm />
      </div>
    </>
  );
}
