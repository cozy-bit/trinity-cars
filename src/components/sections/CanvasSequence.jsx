import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 82;
const INITIAL_BATCH_SIZE = 15;

export const CanvasSequence = ({ progress }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  // Helper to get frame path
  const getFramePath = (index) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/sequence/frame_${frameNum}.webp`;
  };

  // Render a specific frame onto the canvas
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex] || imagesRef.current[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // object-fit: cover calculation
    const hRatio = width / imgWidth;
    const vRatio = height / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;
    const offsetX = (width - renderWidth) / 2;
    const offsetY = (height - renderHeight) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(
      img,
      0,
      0,
      imgWidth,
      imgHeight,
      offsetX,
      offsetY,
      renderWidth,
      renderHeight
    );
  }, []);

  // Preloading frames in two phases
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(TOTAL_FRAMES);

    let loadedCount = 0;

    // Phase 1: Load initial batch
    const initialPromises = [];
    for (let i = 0; i < INITIAL_BATCH_SIZE; i++) {
      const p = new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[i] = img;
            loadedCount++;
            setLoadPercent(Math.round((loadedCount / INITIAL_BATCH_SIZE) * 100));
            if (i === 0) {
              renderFrame(0);
            }
          }
          resolve(img);
        };
        img.onerror = () => resolve(null);
      });
      initialPromises.push(p);
    }

    Promise.all(initialPromises).then(() => {
      if (isCancelled) return;
      setIsLoaded(true);
      renderFrame(0);

      // Phase 2: Load remaining frames in background
      for (let i = INITIAL_BATCH_SIZE; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[i] = img;
          }
        };
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [renderFrame]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const frameIndex = Math.min(
        Math.max(Math.round(currentFrameRef.current), 0),
        TOTAL_FRAMES - 1
      );
      renderFrame(frameIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Update target frame when progress prop changes
  useEffect(() => {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    targetFrameRef.current = clampedProgress * (TOTAL_FRAMES - 1);
  }, [progress]);

  // Animation RAF loop with LERP for smooth playback
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        // LERP factor: 0.12 gives smooth, silky responsiveness
        currentFrameRef.current += diff * 0.12;
        const frameIndex = Math.min(
          Math.max(Math.round(currentFrameRef.current), 0),
          TOTAL_FRAMES - 1
        );
        renderFrame(frameIndex);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [renderFrame]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-[#0d0f11]">
      <canvas
        ref={canvasRef}
        className="w-full h-full block select-none pointer-events-none"
      />

      {/* Loading overlay for initial batch */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d0f11] text-white">
          <div className="w-48 h-1 bg-[#1a1d21] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-brand-cyan transition-all duration-200 shadow-[0_0_12px_var(--color-brand-cyan)]"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            Loading sequence {loadPercent}%
          </span>
        </div>
      )}
    </div>
  );
};
