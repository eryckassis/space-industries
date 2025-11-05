"use client";

import { useRef, useCallback, useEffect } from "react";
import { AudioElements, AudioState } from "@/lib/types";
import { AUDIO_URLS } from "@/lib/constants";

export function useAudioManager() {
  // ════════════════════════════════════════════════════════════════
  // 📦 STATE & REFS
  // ════════════════════════════════════════════════════════════════

  const audioElements = useRef<AudioElements>({
    startClick: null,
    preloader: null,
    scroll1: null,
    scroll2: null,
    scroll3: null,
    hover: null,
    background: null,
  });

  const audioState = useRef<AudioState>({
    isBackgroundPlaying: true,
    currentSection: 1,
    isScrolling: false,
  });

  // ════════════════════════════════════════════════════════════════
  // 🎬 INICIALIZAÇÃO
  // ════════════════════════════════════════════════════════════════

  /**
   * Inicializa todos os elementos de áudio
   * Deve ser chamado após interação do usuário (requisito do browser)
   */
  const initializeAudio = useCallback(() => {
    if (typeof window === "undefined") return;

    // Criar elementos de áudio dinamicamente
    audioElements.current = {
      startClick: createAudioElement(AUDIO_URLS.START_CLICK),
      preloader: createAudioElement(AUDIO_URLS.PRELOADER),
      scroll1: createAudioElement(AUDIO_URLS.SCROLL, true),
      scroll2: createAudioElement(AUDIO_URLS.SCROLL, true),
      scroll3: createAudioElement(AUDIO_URLS.SCROLL, true),
      hover: createAudioElement(AUDIO_URLS.HOVER),
      background: createAudioElement(AUDIO_URLS.BACKGROUND_MUSIC, true),
    };

    // Configurar volume da música de fundo
    if (audioElements.current.background) {
      audioElements.current.background.volume = 0.5;
    }

    // Configurar volume do hover
    if (audioElements.current.hover) {
      audioElements.current.hover.volume = 0.3;
    }
  }, []);

  // ════════════════════════════════════════════════════════════════
  // 🎵 CONTROLES DE ÁUDIO
  // ════════════════════════════════════════════════════════════════

  /**
   * Toca o som de click inicial
   */
  const playStartClick = useCallback(() => {
    playSafely(audioElements.current.startClick);
  }, []);

  /**
   * Toca o som do preloader
   */
  const playPreloader = useCallback(() => {
    playSafely(audioElements.current.preloader);
  }, []);

  /**
   * Para o som do preloader
   */
  const stopPreloader = useCallback(() => {
    stopAndReset(audioElements.current.preloader);
  }, []);

  /**
   * Inicia música de fundo (com delay)
   */
  const playBackgroundMusic = useCallback((delay = 500) => {
    setTimeout(() => {
      playSafely(audioElements.current.background);
      audioState.current.isBackgroundPlaying = true;
    }, delay);
  }, []);

  /**
   * Toca som de hover
   */
  const playHoverSound = useCallback(() => {
    const hover = audioElements.current.hover;
    if (hover) {
      hover.currentTime = 0;
      playSafely(hover);
    }
  }, []);

  /**
   * Toca som de scroll baseado na seção atual
   */
  const playScrollSound = useCallback((section: number) => {
    audioState.current.currentSection = section;
    audioState.current.isScrolling = true;

    const scrollSound = audioElements.current[
      `scroll${section}` as keyof AudioElements
    ] as HTMLAudioElement | null;

    if (scrollSound && scrollSound.paused) {
      scrollSound.currentTime = 0;
      playSafely(scrollSound);
    }
  }, []);

  /**
   * Para todos os sons de scroll
   */
  const stopAllScrollSounds = useCallback(() => {
    [
      audioElements.current.scroll1,
      audioElements.current.scroll2,
      audioElements.current.scroll3,
    ].forEach((sound) => {
      if (sound && !sound.paused) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
    audioState.current.isScrolling = false;
  }, []);

  /**
   * Setup do sistema de scroll sounds (detecta seção e toca som)
   * Deve ser chamado após preloader terminar
   */
  const setupScrollSounds = useCallback(() => {
    let scrollTimeout: NodeJS.Timeout;

    function getCurrentSection() {
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight * 2; // cada seção tem 200vh
      if (scrollY < sectionHeight) return 1;
      else if (scrollY < sectionHeight * 2) return 2;
      else return 3;
    }

    function handleScroll() {
      const newSection = getCurrentSection();
      audioState.current.isScrolling = true;

      // Se mudou de seção, para todos os sons
      if (newSection !== audioState.current.currentSection) {
        stopAllScrollSounds();
        audioState.current.currentSection = newSection;
      }

      // Toca som da seção atual
      const currentSound = audioElements.current[
        `scroll${newSection}` as keyof AudioElements
      ] as HTMLAudioElement | null;
      if (currentSound && currentSound.paused) {
        currentSound.currentTime = 0;
        playSafely(currentSound);
      }

      // Para sons após 150ms sem scroll
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        stopAllScrollSounds();
      }, 150);
    }

    window.addEventListener("scroll", handleScroll);

    // Retornar cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [stopAllScrollSounds]);

  // ════════════════════════════════════════════════════════════════
  // 🧹 CLEANUP
  // ════════════════════════════════════════════════════════════════

  useEffect(() => {
    return () => {
      // Parar e limpar todos os áudios ao desmontar
      Object.values(audioElements.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);

  // ════════════════════════════════════════════════════════════════
  // 📤 RETURN API
  // ════════════════════════════════════════════════════════════════

  return {
    initializeAudio,
    playStartClick,
    playPreloader,
    stopPreloader,
    playBackgroundMusic,
    playHoverSound,
    playScrollSound,
    stopAllScrollSounds,
    setupScrollSounds, // ⭐ NOVO: setup automático dos sons de scroll
  };
}

// ════════════════════════════════════════════════════════════════
// 🛠️ HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════

/**
 * Cria elemento de áudio programaticamente
 */
function createAudioElement(src: string, loop = false): HTMLAudioElement {
  const audio = new Audio(src);
  audio.preload = "auto";
  if (loop) audio.loop = true;
  return audio;
}

/**
 * Toca áudio com tratamento de erro (browsers modernos exigem interação)
 */
function playSafely(audio: HTMLAudioElement | null) {
  if (!audio) return;
  audio.play().catch((error) => {
    console.warn("Audio playback prevented:", error);
  });
}

/**
 * Para e reseta áudio para o início
 */
function stopAndReset(audio: HTMLAudioElement | null) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}
