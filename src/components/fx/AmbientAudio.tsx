"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Optional ambient pad. Off by default; synthesised (no audio file). */
export function AmbientAudio() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  async function toggle() {
    if (on) {
      const ctx = ctxRef.current;
      const gain = gainRef.current;
      if (ctx && gain) gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      setOn(false);
      return;
    }

    let ctx = ctxRef.current;
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      ctxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
      gainRef.current = gain;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 520;
      filter.connect(gain);

      const o1 = ctx.createOscillator();
      o1.type = "sine";
      o1.frequency.value = 110;
      o1.connect(filter);
      o1.start();

      const o2 = ctx.createOscillator();
      o2.type = "sine";
      o2.frequency.value = 164.81;
      o2.detune.value = 4;
      o2.connect(filter);
      o2.start();
    }

    await ctx.resume().catch(() => {});
    gainRef.current?.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.6);
    setOn(true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className="inline-flex items-center gap-2 text-xs text-ink-400 transition-colors hover:text-white"
    >
      {on ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
      sound {on ? "on" : "off"}
    </button>
  );
}
