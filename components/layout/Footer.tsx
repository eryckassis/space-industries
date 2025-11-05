"use client";

import { IMAGE_URLS } from "@/lib/constants";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content-section">
        {/* Textos poéticos */}
        <div className="footer-content">
          <div className="footer-left">
            <p>THE DARKNESS</p>
            <p>IS WHERE</p>
            <p>LIGHT IS BORN</p>
            <p>MAKE A LIFE</p>
            <p>AMONG THE STARS</p>
            <p>IN A LIMITLESS</p>
            <p>UNIVERSE</p>
          </div>
          <div className="footer-right">
            <p>CREATIVITY FLOWS THROUGH</p>
            <p>INFINITE PATHWAYS</p>
            <p>CONSCIOUSNESS EXPANDS</p>
            <p>INTO BOUNDLESS REALMS</p>
            <p>BECOME THE HERO OF A</p>
            <p>SEAMLESS SINGLE PLAYER</p>
            <p>ADVENTURE</p>
          </div>
        </div>

        {/* Créditos */}
        <div className="footer-credits">
          <p>
            Sound Design & Music by{" "}
            <a
              href="https://open.spotify.com/artist/6YXgRMajnjib8j6Cxzcryp?si=iiLnt59BRp6QgKGizkG5Zg"
              target="_blank"
              rel="noopener noreferrer"
            >
              @NORDICSTUDIOX
            </a>
          </p>
        </div>
      </div>

      {/* SVG grande */}
      <div className="footer-svg-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="footer-svg" src={IMAGE_URLS.FOOTER_SVG} alt="Arrival" />
      </div>
    </footer>
  );
}
