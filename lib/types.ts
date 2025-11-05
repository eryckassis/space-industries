/**
 * 📐 TYPES.TS - Definições de tipos TypeScript
 *
 * PRINCÍPIO SOLID: Interface Segregation Principle (ISP)
 * - Tipos específicos e focados para cada responsabilidade
 * - Evita interfaces "gordas" com muitas propriedades desnecessárias
 */

// ════════════════════════════════════════════════════════════════
// 🎵 AUDIO TYPES
// ════════════════════════════════════════════════════════════════

/**
 * Elementos de áudio do sistema
 * Representa todos os sons utilizados na aplicação
 */
export interface AudioElements {
  startClick: HTMLAudioElement | null;
  preloader: HTMLAudioElement | null;
  scroll1: HTMLAudioElement | null;
  scroll2: HTMLAudioElement | null;
  scroll3: HTMLAudioElement | null;
  hover: HTMLAudioElement | null;
  background: HTMLAudioElement | null;
}

/**
 * Estado do gerenciador de áudio
 */
export interface AudioState {
  isBackgroundPlaying: boolean;
  currentSection: number;
  isScrolling: boolean;
}

// ════════════════════════════════════════════════════════════════
// 🎨 GEOMETRIC ANIMATION TYPES
// ════════════════════════════════════════════════════════════════

/**
 * Posição e raio de um círculo SVG
 */
export interface CirclePosition {
  cx: number;
  cy: number;
  r: number;
}

/**
 * Transição de um círculo (estado inicial → final)
 * Usado para interpolar animações baseadas em scroll
 */
export interface CircleTransition {
  initial: CirclePosition;
  final: CirclePosition;
  outlineCircle?: SVGCircleElement;
  filledCircle?: SVGCircleElement;
}

// ════════════════════════════════════════════════════════════════
// 📜 SCROLL & ANIMATION TYPES
// ════════════════════════════════════════════════════════════════

/**
 * Estado dinâmico baseado no progresso do scroll
 * Valores calculados que mudam conforme usuário rola a página
 */
export interface ScrollState {
  progress: number; // 0 a 1
  scrollY: number;
  maxScroll: number;
  footerProgress: number;
}

/**
 * Estados de consciência baseados no progresso
 * Representa as fases da experiência (SILENCE → UNITY)
 */
export interface AwarenessStates {
  awareness: string;
  becoming: string;
  energy: string;
  presence: string;
}

// ════════════════════════════════════════════════════════════════
// 🧩 COMPONENT PROPS
// ════════════════════════════════════════════════════════════════

/**
 * Props para seções de scroll
 */
export interface ScrollSectionProps {
  className?: string;
  backgroundImage?: string; // Opcional se usar vídeo
  backgroundVideo?: string; // URL do vídeo de fundo
  children?: React.ReactNode;
}

/**
 * Props para componentes de preloader
 */
export interface PreloaderProps {
  onComplete?: () => void;
}

/**
 * Props para AudioEnable
 */
export interface AudioEnableProps {
  onStart: () => void;
}
