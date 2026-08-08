import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BlocWriteup from "@/writeups/Bloc";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BlocWriteup />
  </StrictMode>
);
