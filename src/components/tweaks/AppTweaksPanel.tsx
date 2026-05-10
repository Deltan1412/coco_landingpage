import { TweaksPanel, TweakSection, TweakRadio, TweakToggle } from './index';
import type { Tweaks, HeadlineStyle, QrPattern } from '@/types/tweaks';
import type { SetTweakFn } from '@/hooks/useTweaks';

export interface AppTweaksPanelProps {
  tweaks: Tweaks;
  setTweak: SetTweakFn<Tweaks>;
}

const HEADLINE_OPTIONS: Array<{ value: HeadlineStyle; label: string }> = [
  { label: 'Block', value: 'highlighted' },
  { label: 'Underline', value: 'underline' },
  { label: 'Plain', value: 'plain' },
];

const QR_OPTIONS: Array<{ value: QrPattern; label: string }> = [
  { label: 'Square', value: 'modules' },
  { label: 'Round', value: 'rounded' },
  { label: 'Dots', value: 'dots' },
];

export function AppTweaksPanel({ tweaks, setTweak }: AppTweaksPanelProps) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Headline">
        <TweakRadio
          label="Style"
          value={tweaks.headlineStyle}
          options={HEADLINE_OPTIONS}
          onChange={(v) => setTweak('headlineStyle', v)}
        />
      </TweakSection>
      <TweakSection title="Decoration">
        <TweakToggle
          label="Show star deco"
          value={tweaks.showStars}
          onChange={(v) => setTweak('showStars', v)}
        />
        <TweakToggle
          label="Marquee strip"
          value={tweaks.showMarquee}
          onChange={(v) => setTweak('showMarquee', v)}
        />
      </TweakSection>
      <TweakSection title="QR style">
        <TweakRadio
          label="Pattern"
          value={tweaks.qrPattern}
          options={QR_OPTIONS}
          onChange={(v) => setTweak('qrPattern', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}
