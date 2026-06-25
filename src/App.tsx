import { PromoBanner, Hero, Marquee, Products, Roadmap, Trainers, Register, RegisterForm } from '@/components/sections';
import { AppTweaksPanel } from '@/components/tweaks/AppTweaksPanel';
// import { LangPopup } from '@/components/ui/LangPopup';
import { LangFab } from '@/components/ui/LangFab';
import { useTweaks } from '@/hooks/useTweaks';
import { TWEAK_DEFAULTS } from '@/constants/tweakDefaults';
// import { Nav } from '@/components/layout/Nav';
// import { Footer } from '@/components/layout/Footer';
// import { ScrollNav } from '@/components/ui/ScrollNav';
// import { Nav } from '@/components/layout/Nav';
// import { Footer } from '@/components/layout/Footer';
import { ScrollNav } from '@/components/ui/ScrollNav';

export function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      {/* <LangPopup /> */}
      <LangFab />
      <PromoBanner />
      <Hero tweaks={tweaks} />
      {tweaks.showMarquee && <Marquee />}
      <Products />
      <Roadmap />
      <Trainers tweaks={tweaks} />
      <Register tweaks={tweaks} />
      <RegisterForm />
      {/* <Footer />
      <Footer /> */}
      <AppTweaksPanel tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}
