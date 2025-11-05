"use client";

import { forwardRef } from "react";
import { ScrollSectionProps } from "@/lib/types";

export const ScrollSection = forwardRef<HTMLElement, ScrollSectionProps>(
  function ScrollSection(
    { className = "", backgroundImage, backgroundVideo, children },
    ref
  ) {
    return (
      <section
        ref={ref}
        className={`section ${className}`}
        style={
          backgroundImage && !backgroundVideo
            ? {
                backgroundImage: `url(${backgroundImage})`,
              }
            : backgroundVideo
              ? {
                  position: "relative",
                  overflow: "hidden",
                }
              : {}
        }
      >
        {/* Renderizar vídeo de fundo se fornecido */}
        {backgroundVideo && (
          <video className="section-video" autoPlay loop muted playsInline>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}
        <div
          className="section-content"
          style={{ position: "relative", zIndex: 2 }}
        >
          {children}
        </div>
      </section>
    );
  }
);
