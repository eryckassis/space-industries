/**
 * 🎨 Header - Cabeçalho fixo com navegação
 *
 * PRINCÍPIOS SOLID:
 * - Single Responsibility: apenas UI do header
 * - Open/Closed: aceita callback onHover para sons
 *
 * CONCEITOS DIDÁTICOS:
 * - gsap.to: anima o quadrado de hover
 * - useRef: referência aos elementos DOM para GSAP
 * - mouseenter/mouseleave: eventos de hover
 */

"use client";

import { useRef } from "react";
import gsap from "gsap";

interface HeaderProps {
  onHoverSound?: () => void;
}

export function Header({ onHoverSound }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo com círculos animados */}
        <div className="logo-container">
          <div className="logo-circles">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
          </div>
        </div>

        {/* Navegação principal */}
        <nav className="main-nav">
          <ul>
            <NavItem href="#" active onHover={onHoverSound}>
              JOIN THE UNIVERSE
            </NavItem>
            <NavItem href="#" onHover={onHoverSound}>
              EXPLORE
            </NavItem>
            <NavItem href="#" onHover={onHoverSound}>
              SOUND
            </NavItem>
          </ul>
        </nav>

        {/* Link de contato */}
        <div className="contact-link">
          <a href="#" target="_blank" rel="noopener noreferrer">
            +CONNECT
          </a>
        </div>
      </div>
    </header>
  );
}

// ════════════════════════════════════════════════════════════════
// 🔲 NavItem - Item de navegação com hover animado
// ════════════════════════════════════════════════════════════════

interface NavItemProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  onHover?: () => void;
}

function NavItem({ href, active, children, onHover }: NavItemProps) {
  const squareRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (squareRef.current) {
      gsap.to(squareRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    onHover?.();
  };

  const handleMouseLeave = () => {
    if (squareRef.current) {
      gsap.to(squareRef.current, {
        scaleX: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <a href={href} className={active ? "active" : ""}>
        {children}
      </a>
      <div className="nav-hover-square" ref={squareRef}></div>
    </li>
  );
}
