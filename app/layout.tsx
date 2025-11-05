import type { Metadata } from "next";
import "./globals.css";
import { AUDIO_URLS } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "[gsap/lenis] ❍ Layout Explorations with Gsap, Lenis and ScrollTrigger N°5",
  description:
    "Interactive creative journey with GSAP, Lenis smooth scrolling, and immersive audio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* ══════════════════════════════════════════════════════════ */}
        {/* 🎵 ELEMENTOS DE ÁUDIO (hidden, controlados por JS) */}
        {/* ══════════════════════════════════════════════════════════ */}

        <audio id="startClickSound" preload="auto">
          <source src={AUDIO_URLS.START_CLICK} type="audio/mpeg" />
        </audio>

        <audio id="preloaderSound" preload="auto">
          <source src={AUDIO_URLS.PRELOADER} type="audio/mpeg" />
        </audio>

        <audio id="scrollSound1" loop preload="auto">
          <source src={AUDIO_URLS.SCROLL} type="audio/mpeg" />
        </audio>

        <audio id="scrollSound2" loop preload="auto">
          <source src={AUDIO_URLS.SCROLL} type="audio/mpeg" />
        </audio>

        <audio id="scrollSound3" loop preload="auto">
          <source src={AUDIO_URLS.SCROLL} type="audio/mpeg" />
        </audio>

        <audio id="hoverSound" preload="auto">
          <source src={AUDIO_URLS.HOVER} type="audio/mpeg" />
        </audio>

        <audio id="backgroundMusic" loop preload="auto">
          <source src={AUDIO_URLS.BACKGROUND_MUSIC} type="audio/mpeg" />
        </audio>
      </body>
    </html>
  );
}
