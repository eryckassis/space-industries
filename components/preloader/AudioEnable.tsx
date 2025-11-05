"use client";

import { AudioEnableProps } from "@/lib/types";

export function AudioEnable({ onStart }: AudioEnableProps) {
  return (
    <div className="audio-enable">
      <p>
        ENTER EXPERIENCE
        <br />
        WITH AUDIO
      </p>
      <button
        className="enable-button"
        onClick={onStart}
        aria-label="Start experience with audio"
      >
        START
      </button>
    </div>
  );
}
