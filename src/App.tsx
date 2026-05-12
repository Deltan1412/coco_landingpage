import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Hero, Marquee, Products, Roadmap, Trainers, Register } from '@/components/sections';
import { AppTweaksPanel } from '@/components/tweaks/AppTweaksPanel';
import { ScrollNav } from '@/components/ui/ScrollNav';
import { useTweaks } from '@/hooks/useTweaks';
import { TWEAK_DEFAULTS } from '@/constants/tweakDefaults';

export function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <ScrollNav />
      <Nav />
      <Hero tweaks={tweaks} />
      {tweaks.showMarquee && <Marquee />}
      <Products />
      <Roadmap />
      <Trainers tweaks={tweaks} />
      <Register tweaks={tweaks} />
      <Footer />
      <AppTweaksPanel tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}
