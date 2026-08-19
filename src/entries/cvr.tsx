import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import Piece from "@/cvr/Piece";
import "../index.css";

/**
 * Hydrates rather than creates: the page is prerendered to static HTML at
 * build time, so the body text, headings and citations are readable before
 * this file executes, and remain readable if it never does.
 */
hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <Piece />
  </StrictMode>
);
