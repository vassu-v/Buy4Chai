import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedHeroDemo({ onComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Track layout states in React for clean CSS-based transitions
  const [phase, setPhase] = useState('pouring'); // 'pouring' | 'revealing' | 'done'
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Physics and animation coordinates
  const animState = useRef({
    // Positions relative to screen center
    glassX: 0,
    
    // Liquid fill level (0 to 1)
    liquidLevel: 0,
    streamActive: true,
    streamOpacity: 1,
    
    // Timing and stages
    elapsed: 0,
    phase: 'pouring',
    
    // Glass dimensions
    glassWidth: 240,
    glassHeight: 320,
  });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) { onComplete?.(); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { onComplete?.(); return; }

    let animationFrameId;
    
    // Device Pixel Ratio scaling for ultra-crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const width = windowSize.width;
    const height = windowSize.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const state = animState.current;
    
    // Wave points simulation
    const wavePointsCount = 20;
    const wavePoints = [];
    for (let i = 0; i < wavePointsCount; i++) {
      wavePoints.push({ y: 0, vy: 0 });
    }

    // Splash particles
    const splashParticles = [];
    // Bubble particles
    const bubbles = [];

    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      state.elapsed += dt;

      // --- STATE MACHINE & ANIMATION LOGIC ---
      if (state.phase === 'pouring') {
        // Fill liquid
        if (state.liquidLevel < 0.76) {
          state.liquidLevel += 0.38 * dt; // Fills in ~2 seconds
        } else {
          // Liquid filled, start shutting off the stream
          state.streamOpacity -= 4 * dt;
          if (state.streamOpacity <= 0) {
            state.streamOpacity = 0;
            state.streamActive = false;
            state.phase = 'revealing';
            setPhase('revealing');
          }
        }
      } else if (state.phase === 'revealing') {
        // Slide Glass left (target glassX = -180)
        state.glassX += (-180 - state.glassX) * 4 * dt;

        if (Math.abs(state.glassX - (-180)) < 1) {
          state.glassX = -180;
          state.phase = 'done';
          setPhase('done');
          if (onCompleteRef.current) onCompleteRef.current();
        }
      } else if (state.phase === 'done') {
        state.glassX = -180;
      }

      // Coordinates based on center
      const cx = width / 2;
      const cy = height * 0.5;
      const gx = cx + state.glassX;
      const gy = cy;
      const gw = state.glassWidth;
      const gh = state.glassHeight;

      const glassTopY = gy - gh / 2;
      const glassBottomY = gy + gh / 2;
      const currentLiquidY = glassBottomY - (gh - 18) * state.liquidLevel - 10;

      // --- PHYSICS SIMULATION ---
      
      // Bubbles rising inside liquid
      if (state.liquidLevel > 0.05 && Math.random() < 0.15) {
        const pct = Math.random();
        const halfW = (gw / 2) * (0.7 + 0.3 * (1 - pct)) * 0.8;
        bubbles.push({
          x: gx + (Math.random() - 0.5) * halfW * 2,
          y: glassBottomY - 12,
          vy: -(40 + Math.random() * 50),
          r: 1 + Math.random() * 2.5,
          alpha: 0.4 + Math.random() * 0.4
        });
      }

      // Update bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.y += b.vy * dt;
        b.x += Math.sin(state.elapsed * 5 + b.y * 0.1) * 0.3; // gentle wiggle
        
        if (b.y <= currentLiquidY) {
          // Splash ripple
          const pct = (b.y - glassTopY) / gh;
          const halfW = (gw / 2) * (0.7 + 0.3 * (1 - pct));
          const idx = Math.min(wavePointsCount - 1, Math.max(0, Math.floor(((b.x - (gx - halfW)) / (halfW * 2)) * wavePointsCount)));
          if (wavePoints[idx]) {
            wavePoints[idx].vy -= 0.6;
          }
          bubbles.splice(i, 1);
        }
      }

      // Update splash particles
      for (let i = splashParticles.length - 1; i >= 0; i--) {
        const p = splashParticles[i];
        p.vy += 850 * dt; // gravity
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 2.5;
        if (p.life <= 0) {
          splashParticles.splice(i, 1);
        }
      }

      // Wave physics (Spring formula)
      const kSpring = 0.03;
      const dSpring = 0.08;
      const spread = 0.08;

      for (let i = 0; i < wavePointsCount; i++) {
        const diff = 0 - wavePoints[i].y;
        wavePoints[i].vy += diff * kSpring - wavePoints[i].vy * dSpring;
        wavePoints[i].y += wavePoints[i].vy;
      }

      // Wave propagation
      const leftDeltas = new Array(wavePointsCount).fill(0);
      const rightDeltas = new Array(wavePointsCount).fill(0);
      for (let step = 0; step < 8; step++) {
        for (let i = 0; i < wavePointsCount; i++) {
          if (i > 0) {
            leftDeltas[i] = spread * (wavePoints[i].y - wavePoints[i - 1].y);
            wavePoints[i - 1].vy += leftDeltas[i];
          }
          if (i < wavePointsCount - 1) {
            rightDeltas[i] = spread * (wavePoints[i].y - wavePoints[i + 1].y);
            wavePoints[i + 1].vy += rightDeltas[i];
          }
        }
        for (let i = 0; i < wavePointsCount; i++) {
          if (i > 0) wavePoints[i - 1].y += leftDeltas[i];
          if (i < wavePointsCount - 1) wavePoints[i + 1].y += rightDeltas[i];
        }
      }

      // Stream collision with wave
      if (state.streamActive && state.liquidLevel > 0.02) {
        // Stream hits the middle wave points
        const midIdx = Math.floor(wavePointsCount / 2);
        wavePoints[midIdx].vy += (Math.random() - 0.5) * 4;
        wavePoints[midIdx - 1].vy += (Math.random() - 0.5) * 3;
        wavePoints[midIdx + 1].vy += (Math.random() - 0.5) * 3;

        // Generate splashes at contact
        if (Math.random() < 0.7) {
          splashParticles.push({
            x: gx + (Math.random() - 0.5) * 15,
            y: currentLiquidY - 3,
            vx: (Math.random() - 0.5) * 140,
            vy: -(100 + Math.random() * 120),
            r: 1.5 + Math.random() * 2.5,
            life: 1.0
          });
        }
      }

      // --- RENDERING ---
      // Clear canvas transparently so the text layer behind it is visible
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Steam rising from hot tea (using logo style curves)
      if (state.liquidLevel > 0.15) {
        ctx.save();
        
        // Steam opacity fades in as liquid rises, and sways gently
        const steamOpacity = Math.min(0.22, (state.liquidLevel - 0.15) * 0.4);
        ctx.strokeStyle = `rgba(255, 255, 255, ${steamOpacity})`;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 8;

        const timeOffset = state.elapsed * 2.5;

        // Left steam strand
        ctx.beginPath();
        const sx1 = gx - 30;
        const sy1 = currentLiquidY - 15;
        ctx.moveTo(sx1, sy1);
        ctx.bezierCurveTo(
          sx1 - 15 + Math.sin(timeOffset) * 8, sy1 - 35,
          sx1 + 10 + Math.cos(timeOffset) * 8, sy1 - 70,
          sx1 - 5 + Math.sin(timeOffset * 0.8) * 12, sy1 - 110
        );
        ctx.stroke();

        // Right steam strand
        ctx.beginPath();
        const sx2 = gx + 25;
        const sy2 = currentLiquidY - 15;
        ctx.moveTo(sx2, sy2);
        ctx.bezierCurveTo(
          sx2 + 10 + Math.cos(timeOffset * 1.1) * 8, sy2 - 30,
          sx2 - 15 + Math.sin(timeOffset * 0.9) * 8, sy2 - 65,
          sx2 + 5 + Math.cos(timeOffset * 0.7) * 12, sy2 - 105
        );
        ctx.stroke();

        ctx.restore();
      }

      // 2. Draw Liquid Fill
      if (state.liquidLevel > 0.0) {
        ctx.save();
        
        // Clip to glass interior silhouette
        ctx.beginPath();
        ctx.moveTo(gx - gw / 2 + 5, glassTopY);
        ctx.lineTo(gx - gw * 0.35 + 4, glassBottomY - 12);
        ctx.quadraticCurveTo(gx - gw * 0.3 + 4, glassBottomY - 2, gx, glassBottomY - 2);
        ctx.quadraticCurveTo(gx + gw * 0.3 - 4, glassBottomY - 2, gx + gw * 0.35 - 4, glassBottomY - 12);
        ctx.lineTo(gx + gw / 2 - 5, glassTopY);
        ctx.closePath();
        ctx.clip();

        // Draw Liquid
        const liquidGrad = ctx.createLinearGradient(gx, currentLiquidY, gx, glassBottomY);
        liquidGrad.addColorStop(0, '#F59E0B'); // Frothy/light amber surface
        liquidGrad.addColorStop(0.2, '#D97706'); // Warm orange-brown
        liquidGrad.addColorStop(1, '#78350F'); // Rich dark tea brown

        ctx.fillStyle = liquidGrad;
        ctx.beginPath();
        
        const waveStartX = gx - gw / 2;
        ctx.moveTo(waveStartX, glassBottomY + 20);
        ctx.lineTo(waveStartX, currentLiquidY + wavePoints[0].y);

        // Smooth bezier curve for waves
        for (let i = 0; i < wavePointsCount - 1; i++) {
          const x1 = waveStartX + (i / (wavePointsCount - 1)) * gw;
          const y1 = currentLiquidY + wavePoints[i].y;
          const x2 = waveStartX + ((i + 1) / (wavePointsCount - 1)) * gw;
          const y2 = currentLiquidY + wavePoints[i + 1].y;
          const xc = (x1 + x2) / 2;
          const yc = (y1 + y2) / 2;
          ctx.quadraticCurveTo(x1, y1, xc, yc);
        }
        ctx.lineTo(gx + gw / 2, currentLiquidY + wavePoints[wavePointsCount - 1].y);
        ctx.lineTo(gx + gw / 2, glassBottomY + 20);
        ctx.closePath();
        ctx.fill();

        // Bubbles inside liquid
        ctx.fillStyle = 'rgba(253, 230, 138, 0.45)';
        for (const b of bubbles) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw foam layer
        if (state.liquidLevel > 0.05) {
          ctx.fillStyle = 'rgba(254, 243, 199, 0.35)';
          const frothCenterY = currentLiquidY + wavePoints[Math.floor(wavePointsCount / 2)].y;
          ctx.beginPath();
          ctx.ellipse(gx, frothCenterY, gw * 0.4, 6, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // 3. Draw Viscous Liquid Stream (Irregular, viscous, round blobs)
      if (state.streamActive && state.streamOpacity > 0) {
        ctx.save();
        ctx.globalAlpha = state.streamOpacity;
        
        const streamStartX = cx;
        const streamEndX = gx;
        const streamTargetY = currentLiquidY;

        const resolution = 120; // High resolution for seamless overlap

        // PASS 1: Draw the full background tea stream body
        for (let i = 0; i <= resolution; i++) {
          const t = i / resolution;
          const py = t * streamTargetY;
          const basePx = streamStartX + (streamEndX - streamStartX) * t;
          const lumpFactor = Math.sin(py * 0.05 - state.elapsed * 16) * 0.5 + 0.5;
          const radius = (15 - t * 4) + lumpFactor * 7;
          const px = basePx + Math.sin(py * 0.05 - state.elapsed * 12) * 3.5;

          ctx.fillStyle = '#D97706';
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // PASS 2: Draw the shiny inner highlight on top
        for (let i = 0; i <= resolution; i++) {
          const t = i / resolution;
          const py = t * streamTargetY;
          const basePx = streamStartX + (streamEndX - streamStartX) * t;
          const lumpFactor = Math.sin(py * 0.05 - state.elapsed * 16) * 0.5 + 0.5;
          const radius = (15 - t * 4) + lumpFactor * 7;
          const px = basePx + Math.sin(py * 0.05 - state.elapsed * 12) * 3.5;

          ctx.fillStyle = '#FCD34D';
          ctx.beginPath();
          ctx.arc(px - radius * 0.15, py - radius * 0.15, radius * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // 4. Draw Splashes
      for (const sp of splashParticles) {
        ctx.fillStyle = `rgba(245, 158, 11, ${sp.life})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw Glass
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(gx - gw / 2, glassTopY);
      ctx.lineTo(gx - gw * 0.35, glassBottomY - 12);
      ctx.quadraticCurveTo(gx - gw * 0.3, glassBottomY - 2, gx, glassBottomY - 2);
      ctx.quadraticCurveTo(gx + gw * 0.3, glassBottomY - 2, gx + gw * 0.35, glassBottomY - 12);
      ctx.lineTo(gx + gw / 2, glassTopY);
      ctx.stroke();

      // Highlight reflections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(gx - gw / 2 + 8, glassTopY + 15);
      ctx.quadraticCurveTo(gx - gw * 0.38 + 6, glassBottomY - 25, gx - gw * 0.28 + 8, glassBottomY - 12);
      ctx.stroke();

      // Mouth rim
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(gx, glassTopY, gw / 2, 7, 0, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [windowSize]);

  // Derived state to control text animation cleanly via CSS
  const isRevealed = phase === 'revealing' || phase === 'done';

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-black select-none"
    >
      {/* Typography Layer: Physically masked with overflow-hidden starting at screen center (50%). */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          right: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: `translateY(-50%) translateX(${isRevealed ? 40 : -420}px)`,
            opacity: isRevealed ? 1 : 0,
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            width: '400px',
          }}
          className="flex flex-col items-start"
        >
          <h1 className="text-white text-7xl md:text-8xl font-black tracking-tighter leading-none">
            Buy4Chai
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl font-medium mt-3 tracking-wide">
            The headless tip jar.
          </p>
        </div>
      </div>

      {/* Simulation Canvas (Handles stream, glass, liquid, physics, steam) */}
      <canvas
        ref={canvasRef}
        style={{ zIndex: 10 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
