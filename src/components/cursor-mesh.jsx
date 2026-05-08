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
      // Clamp so the radial-gradient cluster (which extends ±~20% around the
      // cursor) always reaches the viewport edges instead of drifting offscreen.
      const px = (x / window.innerWidth) * 100;
      const py = (y / window.innerHeight) * 100;
      const cx = Math.max(20, Math.min(80, px));
      const cy = Math.max(15, Math.min(85, py));
      root.style.setProperty("--cursor-x", `${cx}%`);
      root.style.setProperty("--cursor-y", `${cy}%`);
    };
    setVars(currentX, currentY);

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
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