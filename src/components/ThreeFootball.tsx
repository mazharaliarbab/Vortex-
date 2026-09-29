import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeFootballProps {
  className?: string;
  size?: number;
}

export const ThreeFootball: React.FC<ThreeFootballProps> = ({
  className = '',
  size = 420
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;

    try {
      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      camera.position.z = 4.2;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      container.appendChild(renderer.domElement);

      // 2. Procedural High-Res Modern Football Texture on 2D Canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Base dark titanium/carbon
        ctx.fillStyle = '#0f1015';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid of modern technical panels
        ctx.strokeStyle = '#1e2029';
        ctx.lineWidth = 4;

        const cols = 12;
        const rows = 6;
        const colWidth = canvas.width / cols;
        const rowHeight = canvas.height / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * colWidth;
            const y = r * rowHeight;
            const isAlt = (c + r) % 2 === 0;

            if (isAlt) {
              // Carbon fiber weave simulation
              ctx.fillStyle = '#171922';
              ctx.fillRect(x + 2, y + 2, colWidth - 4, rowHeight - 4);
            } else {
              ctx.fillStyle = '#0b0c10';
              ctx.fillRect(x + 2, y + 2, colWidth - 4, rowHeight - 4);
            }

            // Technical geometric sports graphics
            if ((c * 3 + r) % 5 === 0) {
              ctx.fillStyle = '#00ff87'; // energetic neon accent
              ctx.beginPath();
              ctx.moveTo(x + colWidth * 0.2, y + rowHeight * 0.5);
              ctx.lineTo(x + colWidth * 0.5, y + rowHeight * 0.2);
              ctx.lineTo(x + colWidth * 0.8, y + rowHeight * 0.5);
              ctx.lineTo(x + colWidth * 0.5, y + rowHeight * 0.8);
              ctx.closePath();
              ctx.fill();

              // Inner dark cutout
              ctx.fillStyle = '#0f1015';
              ctx.beginPath();
              ctx.arc(x + colWidth * 0.5, y + rowHeight * 0.5, colWidth * 0.12, 0, Math.PI * 2);
              ctx.fill();
            }

            // Aerodynamic seam grooves
            ctx.strokeRect(x, y, colWidth, rowHeight);
          }
        }

        // Horizontal velocity aerodynamic lines
        ctx.strokeStyle = 'rgba(0, 255, 135, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.35);
        ctx.lineTo(canvas.width, canvas.height * 0.35);
        ctx.moveTo(0, canvas.height * 0.65);
        ctx.lineTo(canvas.width, canvas.height * 0.65);
        ctx.stroke();
      }

      const ballTexture = new THREE.CanvasTexture(canvas);
      ballTexture.wrapS = THREE.RepeatWrapping;
      ballTexture.wrapT = THREE.ClampToEdgeWrapping;

      // 3. Football Mesh
      const geometry = new THREE.SphereGeometry(1.4, 64, 64);
      const material = new THREE.MeshStandardMaterial({
        map: ballTexture,
        roughness: 0.35,
        metalness: 0.25,
        bumpScale: 0.05
      });

      const football = new THREE.Mesh(geometry, material);
      scene.add(football);

      // 4. Subtle Outer Atmosphere Glow Ring
      const ringGeo = new THREE.RingGeometry(1.6, 1.63, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00ff87,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2
      });
      const orbitRing = new THREE.Mesh(ringGeo, ringMat);
      orbitRing.rotation.x = Math.PI * 0.35;
      scene.add(orbitRing);

      // 5. Lighting: Stadium Floodlights + Neon Rim
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const mainSpot = new THREE.DirectionalLight(0xffffff, 2.2);
      mainSpot.position.set(4, 5, 4);
      scene.add(mainSpot);

      const neonRimLight = new THREE.PointLight(0x00ff87, 4.0, 10);
      neonRimLight.position.set(-3, -2, 2);
      scene.add(neonRimLight);

      const topStadiumLight = new THREE.DirectionalLight(0x80ffd0, 1.4);
      topStadiumLight.position.set(0, 6, 1);
      scene.add(topStadiumLight);

      // 6. Interactive Mouse Physics
      let targetRotX = 0;
      let targetRotY = 0;
      let currentRotX = 0;
      let currentRotY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = mouseX * 0.8;
        targetRotX = -mouseY * 0.8;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // 7. Animation Loop
      let clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth base rotation
        football.rotation.y += 0.008;
        football.rotation.x += 0.002;

        // Mouse response inertia
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;
        football.position.x = currentRotY * 0.25;
        football.position.y = currentRotX * 0.25;

        // Gentle floating respiration
        football.position.y += Math.sin(elapsedTime * 1.5) * 0.002;

        // Orbit ring counter-motion
        orbitRing.rotation.z += 0.004;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      // Cleanup
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handleMouseMove);
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
        geometry.dispose();
        material.dispose();
        ballTexture.dispose();
        ringGeo.dispose();
        ringMat.dispose();
      };
    } catch {
      setWebGLSupported(false);
    }
  }, [size]);

  if (!webGLSupported) {
    return (
      <div 
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/50 shadow-2xl ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-4 rounded-full border border-[#00ff87]/30 animate-pulse" />
        <span className="font-heading text-4xl uppercase tracking-widest text-[#00ff87]">VTX 26</span>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Stadium illumination bloom behind the 3D football */}
      <div 
        className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-br from-[#00ff87]/15 via-transparent to-transparent blur-3xl opacity-75"
        aria-hidden="true"
      />
      <div 
        ref={containerRef} 
        style={{ width: size, height: size }} 
        className="cursor-grab active:cursor-grabbing transition-transform duration-300"
      />
    </div>
  );
};
