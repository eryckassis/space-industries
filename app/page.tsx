"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

// Componentes
import { AudioEnable } from "@/components/preloader/AudioEnable";
import { Preloader } from "@/components/preloader/Preloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  GeometricBackground,
  GeometricBackgroundHandle,
} from "@/components/geometric/GeometricBackground";
import { GlowingCircle } from "@/components/ui/GlowingCircle";
import { ScrollSection } from "@/components/sections/ScrollSection";

// Hooks
import { useAudioManager } from "@/hooks/useAudioManager";
import { useLenis } from "@/hooks/useLenis";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useGeometricAnimations } from "@/hooks/useGeometricAnimations";
import { useFooterReveal } from "@/hooks/useFooterReveal";
import { useFooterTextReveal } from "@/hooks/useFooterTextReveal";

// Constants
import { IMAGE_URLS } from "@/lib/constants";

export default function Home() {
  // ════════════════════════════════════════════════════════════════
  // 📦 STATE
  // ════════════════════════════════════════════════════════════════

  const [showAudioEnable, setShowAudioEnable] = useState(true);
  const [showPreloader, setShowPreloader] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  // ════════════════════════════════════════════════════════════════
  // 🎯 REFS
  // ════════════════════════════════════════════════════════════════

  const glowCircleRef = useRef<HTMLDivElement>(null);
  const geometricBgRef = useRef<GeometricBackgroundHandle>(null);
  const gradientRevealRef = useRef<HTMLDivElement>(null);

  // ════════════════════════════════════════════════════════════════
  // 🎵 HOOKS
  // ════════════════════════════════════════════════════════════════

  const audio = useAudioManager();

  // Lenis (smooth scroll) - só inicializa depois do preloader
  useLenis();

  // Animações GSAP - desabilitadas até fim do preloader
  useScrollAnimations({
    glowCircleRef,
    sectionsRef: { current: null } as any, // será preenchido após mount
    enabled: animationsEnabled,
  });

  // ⭐ Animações geométricas (SVG circles + grid + debug texts)
  useGeometricAnimations({
    enabled: animationsEnabled,
  });

  // ⭐ Animação de reveal do SVG do footer
  useFooterReveal({
    enabled: animationsEnabled,
  });

  // ⭐ Animação de reveal dos textos do footer
  useFooterTextReveal({
    enabled: animationsEnabled,
  });

  // ════════════════════════════════════════════════════════════════
  // 🎬 EVENT HANDLERS
  // ════════════════════════════════════════════════════════════════

  /**
   * Usuário clicou em START
   */
  const handleStart = () => {
    // Adicionar classe loading-active ao body
    document.body.classList.add("loading-active");

    // Inicializar e tocar áudios
    audio.initializeAudio();
    audio.playStartClick();
    audio.playPreloader();
    audio.playBackgroundMusic(500);

    // Transição: AudioEnable → Preloader
    setShowAudioEnable(false);
    setShowPreloader(true);
  };

  /**
   * Preloader completou (chegou a 100)
   */
  const handlePreloaderComplete = () => {
    // Parar som do preloader
    audio.stopPreloader();

    // Remover classe loading-active
    document.body.classList.remove("loading-active");

    // Animar gradient reveal (fade out) - GSAP
    if (gradientRevealRef.current) {
      gsap.to(gradientRevealRef.current, {
        y: "-500vh",
        duration: 2,
        ease: "power2.inOut",
        delay: 0.25,
      });
    }

    // Fade out do preloader com GSAP
    const preloaderEl = document.getElementById("preloader");
    if (preloaderEl) {
      gsap.to(preloaderEl, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        delay: 1.0,
        onComplete: () => {
          setShowPreloader(false);
          setAnimationsEnabled(true); // ativar animações de scroll

          // ⭐ SETUP DOS SONS DE SCROLL (após preloader)
          audio.setupScrollSounds();
        },
      });
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 🎨 RENDER
  // ════════════════════════════════════════════════════════════════

  return (
    <>
      {/* Tela de ativação de áudio */}
      {showAudioEnable && <AudioEnable onStart={handleStart} />}

      {/* Preloader animado */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Gradient reveal (fade out após preloader) */}
      <div className="gradient-reveal" ref={gradientRevealRef}></div>

      {/* Header fixo */}
      <Header onHoverSound={audio.playHoverSound} />

      {/* Background geométrico SVG */}
      <GeometricBackground ref={geometricBgRef} />

      {/* Círculo central que cresce */}
      <GlowingCircle ref={glowCircleRef} />

      {/* Seções com parallax */}
      <ScrollSection className="section-1" backgroundVideo="/starvideo2.mp4" />
      <ScrollSection
        className="section-2"
        backgroundImage={IMAGE_URLS.SECTION_2_BG}
      />
      <ScrollSection
        className="section-3"
        backgroundImage={IMAGE_URLS.SECTION_3_BG}
      />

      {/* Footer */}
      <Footer />
    </>
  );
}
