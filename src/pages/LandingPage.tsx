import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PromoBanner, Hero, Marquee, Products, Roadmap, Trainers, Register } from '@/components/sections';
import { AppTweaksPanel } from '@/components/tweaks/AppTweaksPanel';
import { LangFab } from '@/components/ui/LangFab';
import { useTweaks } from '@/hooks/useTweaks';
import { TWEAK_DEFAULTS } from '@/constants/tweakDefaults';

export function LandingPage() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Wait for layout/paint so the target section is measured before scrolling.
    const id = requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(id);
  }, [hash]);
  return (
    <>
      <LangFab />
      <PromoBanner />
      <Hero tweaks={tweaks} />
      {tweaks.showMarquee && <Marquee />}
      <Products />
      <Roadmap />
      <Trainers tweaks={tweaks} />
      <Register tweaks={tweaks} />
      <AppTweaksPanel tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}
