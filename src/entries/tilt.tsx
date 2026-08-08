import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TiltWriteup from "@/writeups/Tilt";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TiltWriteup />
  </StrictMode>
);
