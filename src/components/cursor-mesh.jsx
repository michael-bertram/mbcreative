import { useEffect } from "react";

export function CursorMesh() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.25;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;

    const root = document.documentElement;
    const setVars = (x, y) => {
      root.style.setProperty("--cursor-x", `${(x / window.innerWidth) * 100}%`);
      root.style.setProperty("--cursor-y", `${(y / window.innerHeight) * 100}%`);
    };
    setVars(currentX, currentY);

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setVars(currentX, currentY);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}