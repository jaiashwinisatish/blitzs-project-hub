"use client";

import { useEffect } from 'react';

const Particles = ({ className }: { className?: string }) => {
  useEffect(() => {
    // Create an overlay div appended to body so particles are above all app content
    const overlay = document.createElement('div');
    overlay.className = className || '';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '99999';
    document.body.appendChild(overlay);

    const container = overlay;

    // Create particles
    const particleCount = 60;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 12 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
      particle.style.transform = `translate3d(0,0,0)`;

      // Random color palette
      const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = Math.floor(Math.random() * 6 + 4) + 'px';
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0.95';
      particle.style.boxShadow = '0 0 8px currentColor, 0 0 18px currentColor';
      particle.style.mixBlendMode = 'screen';

      container.appendChild(particle);
      particles.push(particle);
    }

    // Add CSS animation + keyframes to head
    const style = document.createElement('style');
    style.textContent = `
      .particle {
        pointer-events: none;
        will-change: transform, opacity;
        animation-name: float;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }

      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 0.95; }
        50% { transform: translateY(-50vh) translateX(3vw) rotate(180deg); }
        100% { transform: translateY(-110vh) translateX(-3vw) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // Debug: log mount and create a visible test particle on localhost only
    try {
      // eslint-disable-next-line no-console
      console.log('[Particles] mounted (overlay)');
      if (typeof window !== 'undefined' && window.location.hostname.includes('localhost')) {
        const test = document.createElement('div');
        test.className = 'particle test-particle';
        test.style.width = '26px';
        test.style.height = '26px';
        test.style.left = '50%';
        test.style.top = '50%';
        test.style.transform = 'translate(-50%, -50%)';
        test.style.backgroundColor = '#38bdf8';
        test.style.opacity = '0.98';
        test.style.boxShadow = '0 0 24px #38bdf8, 0 0 48px #60a5fa';
        test.style.animationDuration = '8s';
        test.style.zIndex = '100000';
        container.appendChild(test);
        particles.push(test);
      }
    } catch (e) {
      // ignore
    }

    return () => {
      // cleanup particles
      particles.forEach(p => {
        if (container.contains(p)) container.removeChild(p);
      });
      if (document.head.contains(style)) document.head.removeChild(style);
      if (document.body.contains(overlay)) document.body.removeChild(overlay);
    };
  }, [className]);

  return null;
};

export default Particles;