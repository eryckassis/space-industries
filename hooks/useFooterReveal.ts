/**
 * 🎬 useFooterReveal - Animação de reveal no SVG do footer
 *
 * PRINCÍPIOS SOLID:
 * - Single Responsibility: apenas animação do footer SVG
 * - Dependency Inversion: usa GSAP como abstração
 *
 * CONCEITOS DIDÁTICOS:
 * - ScrollTrigger: anima quando o footer entra na viewport
 * - clipPath/mask: cria efeito de reveal (cortina)
 * - from/to: define estado inicial e final
 */

"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseFooterRevealProps {
  enabled?: boolean;
}

export function useFooterReveal({ enabled = true }: UseFooterRevealProps = {}) {
  useEffect(() => {
    if (!enabled) return;

    // Aguardar montagem do DOM
    const timer = setTimeout(() => {
      const footerSvg = document.querySelector(".footer-svg");

      if (!footerSvg) {
        console.warn("Footer SVG não encontrado");
        return;
      }

      // ════════════════════════════════════════════════════════════════
      // 🎬 ANIMAÇÃO: Image Reveal (Cortina da esquerda para direita)
      // ════════════════════════════════════════════════════════════════

      gsap.fromTo(
        footerSvg,
        {
          // Estado inicial
          clipPath: "inset(0 100% 0 0)", // Escondido (cortina fechada à direita)
          opacity: 0,
        },
        {
          // Estado final
          clipPath: "inset(0 0% 0 0)", // Revelado (cortina aberta)
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-svg-section",
            start: "top 80%", // Começa quando o footer está 80% visível
            end: "top 50%",
            scrub: 1, // Sincroniza com scroll (suave)
            // markers: true, // Descomente para debug
          },
        }
      );
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".footer-svg-section") {
          trigger.kill();
        }
      });
    };
  }, [enabled]);

  return null;
}
