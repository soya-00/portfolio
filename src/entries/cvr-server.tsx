import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import Piece from "@/cvr/Piece";

/** Build-time render. Consumed by scripts/prerender.mjs, never by a browser. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <Piece />
    </StrictMode>
  );
}
