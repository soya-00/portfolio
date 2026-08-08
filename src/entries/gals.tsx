import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GalsWriteup from "@/writeups/Gals";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GalsWriteup />
  </StrictMode>
);
