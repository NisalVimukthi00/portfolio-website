import { useEffect, useRef } from "react";

const FRAME_COUNT = 240;
const MAX_DPR = 3; // High-DPI sharpness for top tier displays
const BATCH_CONCURRENCY = 8; // Increased concurrent downloads for smoother streaming

function getFrameUrl(index) {
  const frameNumber = (index + 1).toString().padStart(3, "0");
  return `/jpg/ezgif-frame-${frameNumber}.jpg`;
}

export default function SiteBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Cache of loaded images
    const images = new Array(FRAME_COUNT).fill(null);
    const loaded = new Set();
    const inFlight = new Set();
    let currentRenderedFrame = -1;
    let targetFrame = 0;
    let smoothedFrame = 0;
    let isRunning = true;
    let animId = null;

    // Responsive Canvas Sizing (DPR-aware)
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const targetW = Math.round(width * dpr);
      const targetH = Math.round(height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        currentRenderedFrame = -1; // Trigger immediate redraw on next frame
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("orientationchange", resizeCanvas, { passive: true });

    // Mathematical cover draw ensuring full width and height with zero letterbox bars
    const drawFrame = (frameIdx) => {
      // Find requested frame or fallback to nearest loaded frame
      let img = images[frameIdx];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < FRAME_COUNT; offset++) {
          const prev = frameIdx - offset;
          const next = frameIdx + offset;
          if (prev >= 0 && images[prev]?.complete && images[prev].naturalWidth > 0) {
            img = images[prev];
            break;
          }
          if (next < FRAME_COUNT && images[next]?.complete && images[next].naturalWidth > 0) {
            img = images[next];
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const imgW = img.naturalWidth || 1920;
      const imgH = img.naturalHeight || 1080;

      const canvasRatio = cw / ch;
      const imgRatio = imgW / imgH;

      let sx, sy, sWidth, sHeight;

      if (canvasRatio > imgRatio) {
        // Wider than 16:9 (PC Ultrawide, 21:9, wide desktop windows)
        sWidth = imgW;
        sHeight = imgW / canvasRatio;
        sx = 0;
        // Keep head, face, and sunglasses cleanly in frame
        sy = (imgH - sHeight) * 0.35;
      } else {
        // Taller than 16:9 (Mobile portrait, tablet, 16:10 laptop)
        sHeight = imgH;
        sWidth = imgH * canvasRatio;
        // Center subject horizontally on mobile
        sx = (imgW - sWidth) / 2;
        sy = 0;
      }

      // Clamp within source image boundaries
      sy = Math.max(0, Math.min(imgH - sHeight, sy));
      sx = Math.max(0, Math.min(imgW - sWidth, sx));

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cw, ch);
      currentRenderedFrame = frameIdx;
    };

    // Load a single frame with async decoding
    const loadFrame = (index) => {
      if (index < 0 || index >= FRAME_COUNT) return Promise.resolve(null);
      if (loaded.has(index)) return Promise.resolve(images[index]);
      if (inFlight.has(index)) return Promise.resolve(null);

      inFlight.add(index);
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = getFrameUrl(index);
        img.onload = () => {
          images[index] = img;
          loaded.add(index);
          inFlight.delete(index);
          if (index === 0 && currentRenderedFrame === -1) {
            drawFrame(0);
          }
          resolve(img);
        };
        img.onerror = () => {
          inFlight.delete(index);
          resolve(null);
        };
      });
    };

    // Priority preloader queue
    const queue = [];
    let activeWorkers = 0;

    const pumpQueue = () => {
      while (activeWorkers < BATCH_CONCURRENCY && queue.length > 0) {
        const nextIdx = queue.shift();
        if (loaded.has(nextIdx) || inFlight.has(nextIdx)) continue;
        activeWorkers++;
        loadFrame(nextIdx).finally(() => {
          activeWorkers--;
          pumpQueue();
        });
      }
    };

    const enqueueFrames = (frameIndices, highPriority = false) => {
      for (const idx of frameIndices) {
        if (idx >= 0 && idx < FRAME_COUNT && !loaded.has(idx) && !inFlight.has(idx)) {
          if (highPriority) {
            const existingPos = queue.indexOf(idx);
            if (existingPos !== -1) queue.splice(existingPos, 1);
            queue.unshift(idx);
          } else if (!queue.includes(idx)) {
            queue.push(idx);
          }
        }
      }
      pumpQueue();
    };

    // 1. Instantly load initial frame so screen is never empty
    loadFrame(0).then(() => {
      drawFrame(0);
    });

    // 2. Preload first section (frames 1 to 30)
    const initialBatch = [];
    for (let i = 1; i < 35; i++) initialBatch.push(i);
    enqueueFrames(initialBatch);

    // 3. Incrementally enqueue all remaining frames in the background
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 120));
    idleCallback(() => {
      const remaining = [];
      for (let i = 35; i < FRAME_COUNT; i++) remaining.push(i);
      enqueueFrames(remaining);
    });

    // Dynamic scroll tracking with mobile compatibility
    const updateScrollProgress = () => {
      const scrollTop =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight || 1;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight || 1;
      const maxScrollTop = Math.max(scrollHeight - clientHeight, 1);
      const scrollFraction = Math.max(0, Math.min(scrollTop / maxScrollTop, 1));

      targetFrame = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollFraction * FRAME_COUNT)
      );

      // Prioritize frames immediately around user scroll position
      const nearby = [];
      for (let i = targetFrame - 3; i <= targetFrame + 12; i++) {
        if (i >= 0 && i < FRAME_COUNT) nearby.push(i);
      }
      enqueueFrames(nearby, true);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    // Smooth render loop with lerp smoothing
    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetFrame - smoothedFrame;
      if (Math.abs(diff) > 0.01) {
        smoothedFrame += diff * 0.08; // Slower, much smoother easing
      } else {
        smoothedFrame = targetFrame;
      }

      const displayFrame = Math.round(smoothedFrame);
      if (displayFrame !== currentRenderedFrame) {
        drawFrame(displayFrame);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("orientationchange", resizeCanvas);
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div
      className="site-background-wrapper"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        minHeight: "100%",
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
      />
      {/* Subtle cinematic scrim: preserves vivid crimson studio lighting while ensuring text readability */}
      <div
        className="site-background-scrim"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(7, 4, 6, 0.10) 0%, rgba(7, 4, 6, 0.54) 75%, rgba(7, 4, 6, 0.84) 100%), linear-gradient(180deg, rgba(7, 4, 6, 0.42) 0%, transparent 20%, transparent 75%, rgba(7, 4, 6, 0.80) 100%)",
        }}
      />
    </div>
  );
}
