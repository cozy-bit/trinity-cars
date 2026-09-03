import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 82;

export const CanvasSequence = ({ progress = 0 }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  // Helper to get frame path
  const getFramePath = (index) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/sequence/frame_${frameNum}.webp`;
  };

  // Find nearest loaded image to prevent any blank frames or sudden jumps back to frame 0
  const getBestImage = useCallback((targetIndex) => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return null;

    // 1. Exact match if fully loaded
    const exact = images[targetIndex];
    if (exact && exact.complete && exact.naturalWidth > 0) {
      return exact;
    }

    // 2. Search backward for closest loaded frame
    for (let i = targetIndex - 1; i >= 0; i--) {
      const img = images[i];
      if (img && img.complete && img.naturalWidth > 0) {
        return img;
      }
    }

    // 3. Search forward for closest loaded frame
    for (let i = targetIndex + 1; i < TOTAL_FRAMES; i++) {
      const img = images[i];
      if (img && img.complete && img.naturalWidth > 0) {
        return img;
      }
    }

    return null;
  }, []);

  // Render a specific frame onto the canvas
  const renderFrame = useCallback((frameIndex, force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getBestImage(frameIndex);
    if (!img) return;

    if (!force && lastDrawnFrameRef.current === frameIndex) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const targetWidth = Math.round(width * dpr);
    const targetHeight = Math.round(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

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

    lastDrawnFrameRef.current = frameIndex;
  }, [getBestImage]);

  // Preload all frames eagerly in parallel
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    // Load all 82 frames concurrently
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[i] = img;
        loadedCount++;
        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadPercent(percent);

        // As soon as first frame is ready, render it immediately
        if (i === 0) {
          setIsLoaded(true);
          renderFrame(0, true);
        } else if (Math.round(currentFrameRef.current) === i) {
          renderFrame(i, true);
        }

        if (loadedCount >= 10) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {};
    }

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
      renderFrame(frameIndex, true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Update target frame when progress prop changes
  useEffect(() => {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    targetFrameRef.current = clampedProgress * (TOTAL_FRAMES - 1);
  }, [progress]);

  // Animation RAF loop with smooth dampening
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      
      if (Math.abs(diff) > 0.001) {
        // Silky smooth interpolation: 0.14 factor
        currentFrameRef.current += diff * 0.14;

        // Snap to target if very close to eliminate any micro-flicker or jitter
        if (Math.abs(targetFrameRef.current - currentFrameRef.current) < 0.008) {
          currentFrameRef.current = targetFrameRef.current;
        }

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
