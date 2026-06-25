import { useEffect, useState } from 'react';
import '@/styles/register-form.css';
import { useLang } from '@/hooks/useLang';
import { REGISTER_LINK } from '@/constants/links';
import type { TranslationKey } from '@/data/translations';

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FieldName = 'name' | 'occupation' | 'email' | 'aiUsage' | 'expectations';
type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY: Record<FieldName, string> = {
  name: '',
  occupation: '',
  email: '',
  aiUsage: '',
  expectations: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm({ isOpen, onClose }: RegisterFormProps) {
  const { t, lang } = useLang();
  const [values, setValues] = useState<Record<FieldName, string>>(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  // Close on Escape and lock body scroll while the popup is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const setField = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<FieldName, string>> = {};
    (Object.keys(EMPTY) as FieldName[]).forEach((field) => {
      if (!values[field].trim()) next[field] = t('form.error.required');
    });
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
      next.email = t('form.error.email');
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    if (!validate()) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: honeypot, lang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      setValues(EMPTY);
      // On success, transfer the user to the payment page.
      window.location.href = REGISTER_LINK;
    } catch {
      setStatus('error');
    }
  };

  const field = (
    name: FieldName,
    labelKey: TranslationKey,
    placeholderKey: TranslationKey,
    multiline = false,
  ) => (
    <div className={`register-field${errors[name] ? ' has-error' : ''}`}>
      <label htmlFor={`rf-${name}`}>{t(labelKey)}</label>
      {multiline ? (
        <textarea
          id={`rf-${name}`}
          value={values[name]}
          placeholder={t(placeholderKey)}
          onChange={(e) => setField(name, e.target.value)}
        />
      ) : (
        <input
          id={`rf-${name}`}
          type={name === 'email' ? 'email' : 'text'}
          value={values[name]}
          placeholder={t(placeholderKey)}
          onChange={(e) => setField(name, e.target.value)}
        />
      )}
      {errors[name] && <span className="register-field-error">{errors[name]}</span>}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div
      className="register-form-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-form-title"
      onClick={onClose}
    >
      <div className="register-form-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="register-form-close"
          aria-label={t('form.close')}
          onClick={onClose}
        >
          &times;
        </button>
        <div className="register-form-card">
        <div className="register-form-intro">
          <div className="register-cohort">
            <span className="blink" />
            <span>{t('form.badge')}</span>
          </div>
          <h2 id="register-form-title">{t('form.title')}</h2>
          <p>{t('form.subtitle')}</p>
          <div className="register-form-perks">
            <span>{t('form.perk1')}</span>
            <span>{t('form.perk2')}</span>
            <span>{t('form.perk3')}</span>
          </div>
        </div>

        <form className="register-form-fields" onSubmit={handleSubmit} noValidate>
          {field('name', 'form.name.label', 'form.name.placeholder')}
          {field('occupation', 'form.occupation.label', 'form.occupation.placeholder')}
          {field('email', 'form.email.label', 'form.email.placeholder')}
          {field('aiUsage', 'form.aiUsage.label', 'form.aiUsage.placeholder', true)}
          {field('expectations', 'form.expectations.label', 'form.expectations.placeholder', true)}

          {/* Honeypot: hidden from users, bots tend to fill it */}
          <div className="register-hp" aria-hidden="true">
            <label htmlFor="rf-company">Company</label>
            <input
              id="rf-company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {status === 'success' && (
            <div className="register-form-status is-success" role="status">
              {t('form.success')}
            </div>
          )}
          {status === 'error' && (
            <div className="register-form-status is-error" role="alert">
              {t('form.error.submit')}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary register-form-submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? t('form.submitting') : t('form.submit')}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
