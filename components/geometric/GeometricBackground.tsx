/**
 * 🔷 GeometricBackground - Background SVG com grid e círculos animados
 *
 * PRINCÍPIOS SOLID:
 * - Single Responsibility: renderiza e gerencia SVG geométrico
 * - Open/Closed: expõe refs para animações externas
 *
 * CONCEITOS DIDÁTICOS:
 * - SVG programático: criamos elementos SVG dinamicamente
 * - useImperativeHandle: expõe métodos/refs para componente pai
 * - forwardRef: permite passar ref do componente pai
 * - useEffect: gera grid e círculos após montagem
 */

"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { CircleTransition } from "@/lib/types";
import { GRID_CONFIG, CIRCLE_CONFIG } from "@/lib/constants";

export interface GeometricBackgroundHandle {
  circleTransitions: CircleTransition[];
  gridLinesRef: NodeListOf<SVGLineElement> | null;
  geometricTextsRef: NodeListOf<SVGTextElement> | null;
  debugRefs: {
    line1: SVGTextElement | null;
    line2: SVGTextElement | null;
    line3: SVGTextElement | null;
    line4: SVGTextElement | null;
  };
}

export const GeometricBackground = forwardRef<GeometricBackgroundHandle>(
  function GeometricBackground(props, ref) {
    const svgRef = useRef<SVGSVGElement>(null);
    const circleTransitionsRef = useRef<CircleTransition[]>([]);

    // ════════════════════════════════════════════════════════════════
    // 🎨 SETUP DOS ELEMENTOS GEOMÉTRICOS
    // ════════════════════════════════════════════════════════════════

    const setupGeometricElements = () => {
      if (!svgRef.current) return;

      const gridLinesGroup = svgRef.current.querySelector("#grid-lines");
      const circlesOutlineGroup =
        svgRef.current.querySelector("#circles-outline");
      const circlesFilledGroup = svgRef.current.querySelector(
        "#circles-filled > g"
      );

      if (!gridLinesGroup || !circlesOutlineGroup || !circlesFilledGroup)
        return;

      // Criar grid lines
      createGridLines(gridLinesGroup);

      // Criar círculos e armazenar transições
      circleTransitionsRef.current = createCircles(
        circlesOutlineGroup,
        circlesFilledGroup
      );
    };

    // Expor dados para o componente pai (para animações)
    useImperativeHandle(ref, () => ({
      circleTransitions: circleTransitionsRef.current,
      gridLinesRef:
        svgRef.current?.querySelectorAll<SVGLineElement>(".grid-line") || null,
      geometricTextsRef:
        svgRef.current?.querySelectorAll<SVGTextElement>(".geometric-text") ||
        null,
      debugRefs: {
        line1:
          svgRef.current?.querySelector<SVGTextElement>("#debugLine1") || null,
        line2:
          svgRef.current?.querySelector<SVGTextElement>("#debugLine2") || null,
        line3:
          svgRef.current?.querySelector<SVGTextElement>("#debugLine3") || null,
        line4:
          svgRef.current?.querySelector<SVGTextElement>("#debugLine4") || null,
      },
    }));

    useEffect(() => {
      setupGeometricElements();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ════════════════════════════════════════════════════════════════
    // 📐 CRIAR LINHAS DO GRID
    // ════════════════════════════════════════════════════════════════

    function createGridLines(container: Element) {
      const { spacing, verticalLines, horizontalLines } = GRID_CONFIG;

      // Linhas verticais
      for (let i = 0; i <= verticalLines; i++) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("class", "grid-line");
        line.setAttribute("x1", (i * spacing).toString());
        line.setAttribute("y1", "0");
        line.setAttribute("x2", (i * spacing).toString());
        line.setAttribute("y2", "1080");
        container.appendChild(line);
      }

      // Linhas horizontais
      for (let i = 0; i <= horizontalLines; i++) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("class", "grid-line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", (i * spacing).toString());
        line.setAttribute("x2", "1920");
        line.setAttribute("y2", (i * spacing).toString());
        container.appendChild(line);
      }
    }

    // ════════════════════════════════════════════════════════════════
    // ⭕ CRIAR CÍRCULOS E SUAS TRANSIÇÕES
    // ════════════════════════════════════════════════════════════════

    function createCircles(
      outlineContainer: Element,
      filledContainer: Element
    ): CircleTransition[] {
      const { baseDistance: d, centerX, centerY } = CIRCLE_CONFIG;

      // Definir transições (posições iniciais → finais)
      const transitions: CircleTransition[] = [
        // Círculos cardeais (N, S, E, W)
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

        // Círculos diagonais
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

        // Círculos externos
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

        // Círculo central
        {
          initial: { cx: centerX, cy: centerY, r: d * 0.3 },
          final: { cx: centerX, cy: centerY, r: 4 * d },
        },
      ];

      // Criar elementos SVG para cada transição
      return transitions.map((transition) => {
        // Círculo outline
        const outlineCircle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        outlineCircle.setAttribute("class", "circle-outline");
        outlineCircle.setAttribute("cx", transition.initial.cx.toString());
        outlineCircle.setAttribute("cy", transition.initial.cy.toString());
        outlineCircle.setAttribute("r", transition.initial.r.toString());
        outlineContainer.appendChild(outlineCircle);

        // Círculo filled
        const filledCircle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        filledCircle.setAttribute("class", "circle-filled");
        filledCircle.setAttribute("cx", transition.initial.cx.toString());
        filledCircle.setAttribute("cy", transition.initial.cy.toString());
        filledCircle.setAttribute("r", transition.initial.r.toString());
        filledContainer.appendChild(filledCircle);

        return {
          ...transition,
          outlineCircle,
          filledCircle,
        };
      });
    }

    // ════════════════════════════════════════════════════════════════
    // 🎨 RENDER
    // ════════════════════════════════════════════════════════════════

    return (
      <div className="geometric-background">
        <svg
          className="geometric-svg"
          viewBox={GRID_CONFIG.viewBox}
          ref={svgRef}
        >
          <g id="grid-lines"></g>
          <g id="circles-outline"></g>
          <g id="circles-filled">
            <clipPath id="right-half">
              <rect x="960" y="0" width="960" height="1080" />
            </clipPath>
            <g clipPath="url(#right-half)"></g>
          </g>

          {/* Textos estáticos */}
          <text className="geometric-text" x="100" y="100">
            THE CREATIVE
          </text>
          <text className="geometric-text" x="100" y="115">
            PROCESS
          </text>

          <text className="geometric-text" x="1720" y="100">
            THE ESSENCE
          </text>
          <text className="geometric-text" x="1720" y="115">
            OF SOUND
          </text>

          {/* Textos dinâmicos (debug lines - atualizados por animações) */}
          <text className="geometric-text" x="100" y="980" id="debugLine1">
            AWARENESS: SILENCE
          </text>
          <text className="geometric-text" x="100" y="995" id="debugLine2">
            STATE: VOID
          </text>
          <text className="geometric-text" x="100" y="1010" id="debugLine3">
            ENERGY: DORMANT
          </text>
          <text className="geometric-text" x="100" y="1025" id="debugLine4">
            PRESENCE: SOLID
          </text>

          <text className="geometric-text" x="1620" y="980">
            BETWEEN THE
          </text>
          <text className="geometric-text" x="1620" y="995">
            HEARTBEATS
          </text>
        </svg>
      </div>
    );
  }
);
