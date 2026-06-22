import { Hero, Marquee, Products, Roadmap, Trainers, Register } from '@/components/sections';
import { AppTweaksPanel } from '@/components/tweaks/AppTweaksPanel';
import { useTweaks } from '@/hooks/useTweaks';
import { TWEAK_DEFAULTS } from '@/constants/tweakDefaults';

export function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
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
