import { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 82;

export const CanvasSequence = ({ progress = 0 }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const hasStartedBackgroundLoad = useRef(false);

  // Helper to get frame path
  const getFramePath = (index) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/sequence/frame_${frameNum}.webp`;
  };

  // Find nearest loaded image to prevent any blank frames or white flashes
  const getBestImage = useCallback((targetIndex) => {
    const images = imagesRef.current;
    if (!images) return null;

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

    // 4. Ultimate fallback to frame 0
    const first = images[0];
    if (first && first.complete && first.naturalWidth > 0) {
      return first;
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

  // 1. Instant First Frame Load (Non-blocking FCP / LCP)
  useEffect(() => {
    const firstImg = new Image();
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      renderFrame(0, true);
    };
    firstImg.src = getFramePath(0);
    if (firstImg.complete && firstImg.naturalWidth > 0) {
      imagesRef.current[0] = firstImg;
      renderFrame(0, true);
    }
  }, [renderFrame]);

  // 2. Background Async Queue Loading for remaining frames (002-082)
  const loadRemainingFrames = useCallback(() => {
    if (hasStartedBackgroundLoad.current) return;
    hasStartedBackgroundLoad.current = true;

    // Load in staggered non-blocking batches of 4
    let currentIndex = 1;
    const batchSize = 4;

    const loadNextBatch = () => {
      if (currentIndex >= TOTAL_FRAMES) return;

      const endIndex = Math.min(currentIndex + batchSize, TOTAL_FRAMES);
      for (let i = currentIndex; i < endIndex; i++) {
        const frameIdx = i;
        if (!imagesRef.current[frameIdx]) {
          const img = new Image();
          img.onload = () => {
            if (img.naturalWidth > 0) {
              imagesRef.current[frameIdx] = img;
              if (Math.round(currentFrameRef.current) === frameIdx) {
                renderFrame(frameIdx);
              }
            }
          };
          img.src = getFramePath(frameIdx);
        }
      }

      currentIndex = endIndex;
      if (currentIndex < TOTAL_FRAMES) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextBatch, { timeout: 200 });
        } else {
          setTimeout(loadNextBatch, 30);
        }
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNextBatch, { timeout: 300 });
    } else {
      setTimeout(loadNextBatch, 100);
    }
  }, [renderFrame]);

  // Trigger background loading on mount after initial paint or on first user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      loadRemainingFrames();
    }, 150);

    const onUserInteraction = () => {
      loadRemainingFrames();
      window.removeEventListener('wheel', onUserInteraction);
      window.removeEventListener('scroll', onUserInteraction);
      window.removeEventListener('touchmove', onUserInteraction);
      window.removeEventListener('pointerdown', onUserInteraction);
    };

    window.addEventListener('wheel', onUserInteraction, { passive: true });
    window.addEventListener('scroll', onUserInteraction, { passive: true });
    window.addEventListener('touchmove', onUserInteraction, { passive: true });
    window.addEventListener('pointerdown', onUserInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', onUserInteraction);
      window.removeEventListener('scroll', onUserInteraction);
      window.removeEventListener('touchmove', onUserInteraction);
      window.removeEventListener('pointerdown', onUserInteraction);
    };
  }, [loadRemainingFrames]);

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
        currentFrameRef.current += diff * 0.14;

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
    </div>
  );
};

export default CanvasSequence;
