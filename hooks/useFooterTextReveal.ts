/**
 * 🎬 useFooterTextReveal - Animação de reveal nos textos do footer
 *
 * PRINCÍPIOS SOLID:
 * - Single Responsibility: apenas animação dos textos do footer
 * - Dependency Inversion: usa GSAP como abstração
 *
 * CONCEITOS DIDÁTICOS:
 * - ScrollTrigger: anima quando os textos entram na viewport
 * - stagger: anima elementos em sequência (cascata)
 * - clipPath: cria efeito de cortina
 */

"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseFooterTextRevealProps {
  enabled?: boolean;
}

export function useFooterTextReveal({
  enabled = true,
}: UseFooterTextRevealProps = {}) {
  useEffect(() => {
    if (!enabled) return;

    // Aguardar montagem do DOM
    const timer = setTimeout(() => {
      const footerLeftTexts = document.querySelectorAll(".footer-left p");
      const footerRightTexts = document.querySelectorAll(".footer-right p");

      // ════════════════════════════════════════════════════════════════
      // 🎬 ANIMAÇÃO 1: Text Reveal - Footer Left (cascata)
      // ════════════════════════════════════════════════════════════════

      if (footerLeftTexts.length > 0) {
        gsap.fromTo(
          footerLeftTexts,
          {
            opacity: 0,
            y: 20, // Vem de baixo
            clipPath: "inset(0 0 100% 0)", // Cortina de baixo para cima
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15, // 0.15s de delay entre cada linha
            scrollTrigger: {
              trigger: ".footer-left",
              start: "top 85%",
              toggleActions: "play none none none", // Só toca uma vez
            },
          }
        );
      }

      // ════════════════════════════════════════════════════════════════
      // 🎬 ANIMAÇÃO 2: Text Reveal - Footer Right (cascata)
      // ════════════════════════════════════════════════════════════════

      if (footerRightTexts.length > 0) {
        gsap.fromTo(
          footerRightTexts,
          {
            opacity: 0,
            y: 20,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".footer-right",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.vars.trigger;
        if (
          triggerElement === ".footer-left" ||
          triggerElement === ".footer-right"
        ) {
          trigger.kill();
        }
      });
    };
  }, [enabled]);

  return null;
}
