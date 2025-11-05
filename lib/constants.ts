/**
 * 📦 CONSTANTS.TS - Configurações centralizadas
 *
 * PRINCÍPIO SOLID: Single Responsibility Principle (SRP)
 * - Arquivo único responsável por armazenar todas as constantes
 * - Facilita manutenção (alterar URL em um só lugar)
 * - Evita "magic numbers" espalhados pelo código
 */

// ════════════════════════════════════════════════════════════════
// 🎵 AUDIO URLS
// ════════════════════════════════════════════════════════════════

export const AUDIO_URLS = {
  START_CLICK: "https://assets.codepen.io/7558/preloader-2s-001.mp3",
  PRELOADER: "https://assets.codepen.io/7558/preloader-5s-001.mp3",
  SCROLL: "https://assets.codepen.io/7558/glitch-fx-001.mp3",
  HOVER: "https://assets.codepen.io/7558/preloader-2s-001.mp3",
  BACKGROUND_MUSIC: "/starCitzen.mp3", // Arquivo local em public/
} as const;

// ════════════════════════════════════════════════════════════════
// 🖼️ IMAGE URLS
// ════════════════════════════════════════════════════════════════

export const IMAGE_URLS = {
  NOISE_TEXTURE: "https://assets.codepen.io/7558/noise-002.png",
  SECTION_1_BG: "https://assets.codepen.io/7558/blue-orange-003.jpg",
  SECTION_2_BG: "/1168054.jpg",
  SECTION_3_BG: "/sun.jpg",
  FOOTER_SVG: "https://assets.codepen.io/7558/arrival-text.svg",
} as const;

// ════════════════════════════════════════════════════════════════
// ⚙️ ANIMATION CONFIGS
// ════════════════════════════════════════════════════════════════

/**
 * Configuração do Lenis (smooth scroll)
 */
export const LENIS_CONFIG = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical" as const,
  gestureDirection: "vertical" as const,
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
};

/**
 * Configuração do grid SVG
 */
export const GRID_CONFIG = {
  spacing: 48,
  verticalLines: 40,
  horizontalLines: 22,
  viewBox: "0 0 1920 1080",
} as const;

/**
 * Configuração dos círculos geométricos
 */
export const CIRCLE_CONFIG = {
  baseDistance: 80, // distância base 'd'
  centerX: 960,
  centerY: 540,
} as const;

/**
 * Timings do preloader (em ms)
 */
export const PRELOADER_TIMING = {
  counterInterval: 50, // intervalo do contador (50ms = 100 steps em 5s)
  fadeOutDelay: 500,
  totalDuration: 5000,
} as const;

// ════════════════════════════════════════════════════════════════
// 🎨 THEME COLORS
// ════════════════════════════════════════════════════════════════

export const COLORS = {
  warmOffBlack: "#1a1917",
  warmOffWhite: "#f8f5f2",
  textColor: "rgba(245, 245, 245, 0.9)",
  backgroundColor: "#0a0a0a",
} as const;

// ════════════════════════════════════════════════════════════════
// 📊 AWARENESS STATES
// ════════════════════════════════════════════════════════════════

/**
 * Estados de consciência baseados no progresso do scroll
 * Cada fase tem seus próprios valores semânticos
 */
export const AWARENESS_PHASES = [
  {
    maxProgress: 0.1,
    awareness: "SILENCE",
    becoming: "VOID",
    energy: "DORMANT",
  },
  {
    maxProgress: 0.25,
    awareness: "STIRRING",
    becoming: "EMERGING",
    energy: "AWAKENING",
  },
  {
    maxProgress: 0.5,
    awareness: "FLOWING",
    becoming: "EXPANDING",
    energy: "BUILDING",
  },
  {
    maxProgress: 0.75,
    awareness: "ASCENDING",
    becoming: "DISSOLVING",
    energy: "RADIATING",
  },
  {
    maxProgress: 0.9,
    awareness: "TRANSCENDING",
    becoming: "INFINITE",
    energy: "OVERFLOWING",
  },
  {
    maxProgress: 1.0,
    awareness: "UNITY",
    becoming: "ETERNAL",
    energy: "PURE",
  },
] as const;

/**
 * Estados de presença baseados na intensidade
 */
export const PRESENCE_STATES = [
  { minIntensity: 0.8, state: "SOLID" },
  { minIntensity: 0.6, state: "SOFTENING" },
  { minIntensity: 0.4, state: "TRANSLUCENT" },
  { minIntensity: 0.2, state: "ETHEREAL" },
  { minIntensity: 0.0, state: "VOID" },
] as const;
