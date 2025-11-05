/**
 * 🎨 useScrollAnimations - Hook para animações baseadas em scroll (GSAP + ScrollTrigger)
 *
 * PRINCÍPIOS SOLID:
 * - Single Responsibility: apenas animações de scroll (parallax, circle scaling)
 * - Open/Closed: extensível via callbacks/refs passados como parâmetros
 *
 * CONCEITOS DIDÁTICOS:
 * - GSAP: biblioteca de animação profissional (Green Sock Animation Platform)
 * - ScrollTrigger: plugin GSAP para animar baseado em scroll
 * - useEffect cleanup: CRÍTICO para evitar memory leaks com ScrollTrigger
 * - gsap.context: agrupa animações para cleanup fácil
 */

"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin (só uma vez)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollAnimationsProps {
  glowCircleRef: RefObject<HTMLDivElement>;
  sectionsRef: RefObject<NodeListOf<Element>>;
  enabled?: boolean;
}

export function useScrollAnimations({
  glowCircleRef,
  sectionsRef,
  enabled = true,
}: UseScrollAnimationsProps) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (!glowCircleRef.current) return;

    // Criar contexto GSAP (agrupa animações para cleanup)
    const ctx = gsap.context(() => {
      // ════════════════════════════════════════════════════════════════
      // 🌄 PARALLAX DAS SEÇÕES
      // ════════════════════════════════════════════════════════════════

      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          gsap.to(section, {
            backgroundPositionY: "50%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1, // suaviza a animação com o scroll
            },
          });
        });
      }

      // ════════════════════════════════════════════════════════════════
      // ⭕ ANIMAÇÃO DO CÍRCULO CENTRAL (cresce com scroll)
      // ════════════════════════════════════════════════════════════════

      const circle = glowCircleRef.current;
      if (circle) {
        gsap.to(circle, {
          scale: 2.8, // escala final (1 + 1.8 do original)
          boxShadow: "0 0 150px 35px rgba(255, 255, 0, 1)",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }
    });

    // Cleanup: matar todas as animações e ScrollTriggers
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [glowCircleRef, sectionsRef, enabled]);
}
