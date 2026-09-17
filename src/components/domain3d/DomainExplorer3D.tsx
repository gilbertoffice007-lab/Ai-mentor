import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DomainCategory, CareerPath } from '../../types';
import { Sparkles, ArrowRight, BookOpen, Layers, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

interface DomainExplorer3DProps {
  domain: DomainCategory;
  onSelectCareer: (career: CareerPath) => void;
}

export const DomainExplorer3D: React.FC<DomainExplorer3DProps> = ({ domain, onSelectCareer }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(domain.careers[0] || null);
  const [hoveredCareer, setHoveredCareer] = useState<CareerPath | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire interactive world
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Particle Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.25,
      transparent: true,
      opacity: 0.6
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Central Domain Core
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(domain.color || '#4f46e5'),
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: new THREE.Color(domain.color || '#4f46e5'),
      emissiveIntensity: 0.4
    });
    const centralCore = new THREE.Mesh(coreGeo, coreMat);
    worldGroup.add(centralCore);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    worldGroup.add(innerCore);

    // Orbit rings
    const orbitGroup = new THREE.Group();
    worldGroup.add(orbitGroup);
    [4.2, 6.0].forEach((radius) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x475569,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.3;
      orbitGroup.add(ring);
    });

    // Satellite Career Nodes
    const satelliteMeshes: { mesh: THREE.Mesh; career: CareerPath }[] = [];
    const count = domain.careers.length;

    domain.careers.forEach((career, index) => {
      const angle = (index / count) * Math.PI * 2;
      const radius = 5.2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.7;
      const y = Math.sin(angle * 2) * 1.5;

      const satGeo = new THREE.SphereGeometry(0.65, 24, 24);
      const satMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(career.color || '#38bdf8'),
        roughness: 0.3,
        metalness: 0.7,
        emissive: new THREE.Color(career.color || '#38bdf8'),
        emissiveIntensity: 0.3
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.position.set(x, y, z);
      satMesh.userData = { career };
      worldGroup.add(satMesh);
      satelliteMeshes.push({ mesh: satMesh, career });

      // Pulsing halo ring around node
      const haloGeo = new THREE.RingGeometry(0.85, 0.95, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(career.color || '#38bdf8'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 2;
      satMesh.add(halo);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x60a5fa, 2.5, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Interactive Raycasting & Mouse / Touch Rotation
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousPosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const currentWidth = container.clientWidth || width;
      const currentHeight = container.clientHeight || height;
      mouse.x = ((e.clientX - rect.left) / currentWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / currentHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousPosition.x;
        const deltaY = e.clientY - previousPosition.y;
        worldGroup.rotation.y += deltaX * 0.005;
        worldGroup.rotation.x += deltaY * 0.005;
        previousPosition = { x: e.clientX, y: e.clientY };
      }

      // Check hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(satelliteMeshes.map(s => s.mesh));
      if (intersects.length > 0) {
        const hitCareer = intersects[0].object.userData.career;
        setHoveredCareer(hitCareer);
        container.style.cursor = 'pointer';
      } else {
        setHoveredCareer(null);
        container.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = Math.abs(e.clientX - previousPosition.x);
        const deltaY = Math.abs(e.clientY - previousPosition.y);
        if (deltaX < 5 && deltaY < 5) {
          // Click event
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(satelliteMeshes.map(s => s.mesh));
          if (intersects.length > 0) {
            const hitCareer = intersects[0].object.userData.career;
            setSelectedCareer(hitCareer);
          }
        }
      }
      isDragging = false;
    };

    // Touch event handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousPosition.x;
        const deltaY = e.touches[0].clientY - previousPosition.y;
        worldGroup.rotation.y += deltaX * 0.006;
        worldGroup.rotation.x += deltaY * 0.006;
        previousPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation when not dragging
      if (!isDragging) {
        worldGroup.rotation.y += 0.0025;
      }
      centralCore.rotation.y += 0.008;
      centralCore.rotation.x += 0.004;
      starField.rotation.y -= 0.0005;

      // Pulse satellites
      satelliteMeshes.forEach((sat, i) => {
        const mesh = sat.mesh;
        const isSel = selectedCareer?.id === sat.career.id;
        const scale = isSel ? 1.35 + Math.sin(elapsedTime * 4 + i) * 0.08 : 1.0;
        mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 520;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [domain, selectedCareer]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
      {/* 3D Canvas Container */}
      <div className="flex-1 relative min-h-[480px] lg:min-h-[580px] rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-800/80 overflow-hidden shadow-2xl flex flex-col justify-between">
        <div className="absolute top-4 left-4 sm:top-5 sm:left-6 z-10 pointer-events-none">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-400">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-spin" />
            Interactive 3D Universe
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-white mt-0.5 sm:mt-1">{domain.name}</h2>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 hidden min-[420px]:block">Click any node or drag to rotate 360°</p>
        </div>

        {hoveredCareer && (
          <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-10 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-[10px] sm:text-xs text-indigo-200 backdrop-blur-md animate-fade-in pointer-events-none">
            Hovering: <span className="font-semibold text-white">{hoveredCareer.title}</span>
          </div>
        )}

        {/* Three.js mount point */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing flex-1 min-h-[300px]" />

        {/* Bottom Orbit Selector bar */}
        <div className="p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto z-10">
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap pl-1 sm:pl-2">Nodes:</span>
          {domain.careers.map((career) => {
            const isSelected = selectedCareer?.id === career.id;
            return (
              <button
                key={career.id}
                id={`btn-career-select-${career.id}`}
                onClick={() => setSelectedCareer(career)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 min-h-[36px] ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: career.color }} />
                {career.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Career Inspector Panel */}
      {selectedCareer && (
        <div className="w-full lg:w-[420px] rounded-3xl bg-slate-900/90 border border-indigo-500/20 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedCareer.field}
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {selectedCareer.growthRate}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-2.5">{selectedCareer.title}</h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{selectedCareer.description}</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-xs text-slate-400">Avg. Salary</span>
                <p className="text-sm font-semibold text-emerald-300 mt-0.5">{selectedCareer.avgSalary}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-xs text-slate-400">Learning Duration</span>
                <p className="text-sm font-semibold text-indigo-300 mt-0.5">{selectedCareer.learningDuration}</p>
              </div>
            </div>

            {/* Required Skills Chips */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Key Skills Required
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCareer.skillsRequired.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Typical Projects */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Typical Portfolio Projects
              </h4>
              <ul className="text-xs text-slate-300 space-y-1">
                {selectedCareer.typicalProjects.slice(0, 2).map((proj, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {proj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Education */}
            <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-2.5">
              <GraduationCap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-indigo-200">Recommended Education</span>
                <p className="text-xs text-slate-400 mt-0.5">{selectedCareer.recommendedEducation}</p>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              id="btn-start-career-journey"
              onClick={() => onSelectCareer(selectedCareer)}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Your Career Journey
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
