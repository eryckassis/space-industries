/**
 * ⭕ GlowingCircle - Círculo central que cresce com scroll
 *
 * PRINCÍPIOS SOLID:
 * - Single Responsibility: apenas renderiza o círculo
 * - Open/Closed: aceita ref para controle externo (GSAP)
 *
 * CONCEITOS DIDÁTICOS:
 * - forwardRef: permite componente pai passar ref
 * - Necessário para GSAP animar este elemento
 */

"use client";

import { forwardRef } from "react";

export const GlowingCircle = forwardRef<HTMLDivElement>(
  function GlowingCircle(props, ref) {
    return (
      <div className="center-circle">
        <div className="circle-container">
          <div className="glowing-circle" ref={ref}></div>
        </div>
      </div>
    );
  }
);
