/**
 * 🎢 useLenis - Hook para smooth scrolling
 *
 * PRINCÍPIOS SOLID:
 * - Single Responsibility: gerencia apenas o Lenis (smooth scroll)
 * - Dependency Inversion: componentes dependem deste hook, não da lib Lenis
 *
 * CONCEITOS DIDÁTICOS:
 * - Lenis é uma biblioteca de smooth scrolling (alternativa ao Locomotive Scroll)
 * - useEffect com cleanup: importante para desmontar Lenis corretamente
 * - typeof window check: Next.js renderiza no servidor, Lenis só funciona no cliente
 * - Este hook não retorna nada, apenas inicializa o Lenis globalmente
 */

"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { LENIS_CONFIG } from "@/lib/constants";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // ⚠️ IMPORTANTE: Lenis só funciona no cliente (browser)
    if (typeof window === "undefined") return;

    // Inicializar Lenis com configurações
    const lenis = new Lenis(LENIS_CONFIG);
    lenisRef.current = lenis;

    // Função de animação (RAF - RequestAnimationFrame)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup: destruir Lenis ao desmontar
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
}
