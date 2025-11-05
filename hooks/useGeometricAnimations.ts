/**
 * 🔷 useGeometricAnimations - Hook para animações dos elementos SVG geométricos
 *
 * PRINCÍPIOS SOLID:
 * - Single Responsibility: anima apenas grid lines e círculos SVG
 * - Liskov Substitution: pode ser substituído/extendido sem quebrar comportamento
 *
 * CONCEITOS DIDÁTICOS:
 * - Interpolação manual: calculamos valores entre inicial e final baseado no scroll
 * - requestAnimationFrame: otimiza performance (sincroniza com refresh rate do monitor)
 * - SVG manipulation: setAttribute para modificar cx, cy, r, opacity dinamicamente
 * - Debounce via RAF: evita cálculos excessivos
 *
 * VERSÃO SIMPLIFICADA: busca elementos diretamente do DOM
 */

"use client";

import { useEffect } from "react";
import { CircleTransition, ScrollState } from "@/lib/types";
import {
  AWARENESS_PHASES,
  PRESENCE_STATES,
  CIRCLE_CONFIG,
} from "@/lib/constants";

interface UseGeometricAnimationsProps {
  enabled?: boolean;
}

export function useGeometricAnimations({
  enabled = true,
}: UseGeometricAnimationsProps) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let animationFrame: number;
    let circleTransitions: CircleTransition[] = [];

    // Aguardar elementos estarem no DOM
    const initTimeout = setTimeout(() => {
      // Buscar círculos criados pelo GeometricBackground
      const outlineCircles =
        document.querySelectorAll<SVGCircleElement>(".circle-outline");
      const filledCircles =
        document.querySelectorAll<SVGCircleElement>(".circle-filled");

      // Criar transições baseadas nos círculos existentes
      const { baseDistance: d, centerX, centerY } = CIRCLE_CONFIG;

      const transitionConfigs: Array<{
        initial: { cx: number; cy: number; r: number };
        final: { cx: number; cy: number; r: number };
      }> = [
        {
          initial: { cx: centerX - 3 * d, cy: centerY, r: d * 0.8 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX + 3 * d, cy: centerY, r: d * 0.8 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX, cy: centerY - 3 * d, r: d * 0.8 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX, cy: centerY + 3 * d, r: d * 0.8 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX - 2 * d, cy: centerY - 2 * d, r: d * 0.6 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX + 2 * d, cy: centerY - 2 * d, r: d * 0.6 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX - 2 * d, cy: centerY + 2 * d, r: d * 0.6 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX + 2 * d, cy: centerY + 2 * d, r: d * 0.6 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX - 4 * d, cy: centerY, r: d * 0.4 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX + 4 * d, cy: centerY, r: d * 0.4 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX, cy: centerY - 4 * d, r: d * 0.4 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX, cy: centerY + 4 * d, r: d * 0.4 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
        {
          initial: { cx: centerX, cy: centerY, r: d * 0.3 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
      ];

      circleTransitions = transitionConfigs.map((config, index) => ({
        ...config,
        outlineCircle: outlineCircles[index],
        filledCircle: filledCircles[index],
      }));

      updateAnimations();
    }, 100);

    // ════════════════════════════════════════════════════════════════
    // 📊 FUNÇÃO DE ATUALIZAÇÃO (roda a cada frame)
    // ════════════════════════════════════════════════════════════════

    function updateAnimations() {
      const state = calculateScrollState();

      updateGridOpacity(state);
      updateCircles(state);
      updateDebugTexts(state);
      updateGeometricTexts(state);
    }

    function calculateScrollState(): ScrollState {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      const footer = document.querySelector(".site-footer") as HTMLElement;
      const footerStart = footer ? footer.offsetTop - window.innerHeight : 0;
      const footerProgress = Math.max(
        0,
        (scrollY - footerStart) / (window.innerHeight * 0.5)
      );

      return { progress, scrollY, maxScroll, footerProgress };
    }

    function updateGridOpacity(state: ScrollState) {
      const gridLines = document.querySelectorAll<SVGLineElement>(".grid-line");
      const opacity = Math.max(0, 0.3 * (1 - state.progress * 1.5));
      gridLines.forEach((line) => {
        line.setAttribute("stroke-opacity", opacity.toString());
      });
    }

    function updateCircles(state: ScrollState) {
      circleTransitions.forEach((transition, index) => {
        const currentCx =
          transition.initial.cx +
          (transition.final.cx - transition.initial.cx) * state.progress;
        const currentCy =
          transition.initial.cy +
          (transition.final.cy - transition.initial.cy) * state.progress;
        const currentR =
          transition.initial.r +
          (transition.final.r - transition.initial.r) * state.progress;

        const rotation = state.progress * 360 * (index % 2 === 0 ? 1 : -1);
        const opacity = Math.max(0.1, 1 - state.progress * 0.7);

        if (transition.outlineCircle) {
          transition.outlineCircle.setAttribute("cx", currentCx.toString());
          transition.outlineCircle.setAttribute("cy", currentCy.toString());
          transition.outlineCircle.setAttribute("r", currentR.toString());
          transition.outlineCircle.setAttribute(
            "transform",
            `rotate(${rotation} ${currentCx} ${currentCy})`
          );
          transition.outlineCircle.setAttribute(
            "stroke-opacity",
            opacity.toString()
          );
        }

        if (transition.filledCircle) {
          transition.filledCircle.setAttribute("cx", currentCx.toString());
          transition.filledCircle.setAttribute("cy", currentCy.toString());
          transition.filledCircle.setAttribute("r", currentR.toString());
          transition.filledCircle.setAttribute(
            "transform",
            `rotate(${rotation} ${currentCx} ${currentCy})`
          );
          transition.filledCircle.setAttribute(
            "fill-opacity",
            (opacity * 0.05).toString()
          );
        }
      });
    }

    function updateDebugTexts(state: ScrollState) {
      const freq1 = (432 + state.progress * 108).toFixed(1);
      const freq2 = (528 - state.progress * 156).toFixed(1);
      const energy = (state.progress * 99.9).toFixed(1);
      const presence = ((1 - state.progress) * 100).toFixed(1);

      const awarenessStates = getAwarenessStates(state.progress);
      const presenceState = getPresenceState(1 - state.progress);

      const line1 = document.getElementById("debugLine1");
      const line2 = document.getElementById("debugLine2");
      const line3 = document.getElementById("debugLine3");
      const line4 = document.getElementById("debugLine4");

      if (line1)
        line1.textContent = `[${freq1}] AWARENESS: ${awarenessStates.awareness}`;
      if (line2)
        line2.textContent = `.${freq2} STATE: ${awarenessStates.becoming}`;
      if (line3)
        line3.textContent = `{${energy}} ENERGY: ${awarenessStates.energy}`;
      if (line4) line4.textContent = `.${presence} PRESENCE: ${presenceState}`;
    }

    function getAwarenessStates(progress: number) {
      for (const phase of AWARENESS_PHASES) {
        if (progress <= phase.maxProgress) {
          return {
            awareness: phase.awareness,
            becoming: phase.becoming,
            energy: phase.energy,
            presence: "",
          };
        }
      }
      return {
        awareness: "UNITY",
        becoming: "ETERNAL",
        energy: "PURE",
        presence: "",
      };
    }

    function getPresenceState(intensity: number): string {
      for (const state of PRESENCE_STATES) {
        if (intensity >= state.minIntensity) {
          return state.state;
        }
      }
      return "VOID";
    }

    function updateGeometricTexts(state: ScrollState) {
      const texts =
        document.querySelectorAll<SVGTextElement>(".geometric-text");
      const opacity = Math.max(0, 1 - state.footerProgress * 2);
      texts.forEach((text) => {
        text.style.opacity = opacity.toString();
      });
    }

    function handleScroll() {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateAnimations);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);
}
