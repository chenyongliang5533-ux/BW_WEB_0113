// components/Model3DViewer.tsx
"use client";

import { useEffect, useRef } from 'react';
import type { Object3D } from 'three';

export default function Model3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cleanup: (() => void) | null = null;
    let cancelled = false;

    // Dynamically import three.js and loaders as ES modules
    // (using a recent version that supports Meshopt natively)
    (async () => {
      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { MeshoptDecoder } = await import('three/examples/jsm/libs/meshopt_decoder.module.js');

        if (cancelled || !containerRef.current) return;

        const container = containerRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf9fafb);

        const camera = new THREE.PerspectiveCamera(
          45,
          container.clientWidth / container.clientHeight,
          0.1,
          1000
        );
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 1.8));

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight1.position.set(5, 5, 5);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight2.position.set(-5, -5, -5);
        scene.add(dirLight2);

        const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
        topLight.position.set(0, 10, 0);
        scene.add(topLight);

        scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.2));

        // GLTFLoader with Meshopt support
        const loader = new GLTFLoader();

        // Meshopt decoder — ships with three.js, no external CDN needed
        loader.setMeshoptDecoder(MeshoptDecoder);

        let model: Object3D | null = null;

        loader.load(
          '/models/BWR352.glb',
          (gltf) => {
            if (cancelled) return;
            model = gltf.scene;

            // Center and scale to fit view
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            model.scale.setScalar(scale);
            model.position.sub(center.multiplyScalar(scale));

            scene.add(model);
          },
          undefined,
          (error) => {
            console.error('Error loading model:', error);
          }
        );

        // Drag-to-rotate interaction
        let isDragging = false;
        let previousPos = { x: 0, y: 0 };
        // Initial rotation: mostly top-down view with a gentle ~30° forward tilt
        // -Math.PI / 3 ≈ 60° from front (i.e., 30° down from pure top-view)
        const rotation = { x: -Math.PI / 3, y: 0 };

        const onPointerDown = (e: PointerEvent) => {
          isDragging = true;
          previousPos = { x: e.clientX, y: e.clientY };
          renderer.domElement.style.cursor = 'grabbing';
        };

        const onPointerMove = (e: PointerEvent) => {
          if (!isDragging) return;
          rotation.y += (e.clientX - previousPos.x) * 0.01;
          rotation.x += (e.clientY - previousPos.y) * 0.01;
          previousPos = { x: e.clientX, y: e.clientY };
        };

        const onPointerUp = () => {
          isDragging = false;
          renderer.domElement.style.cursor = 'grab';
        };

        renderer.domElement.style.cursor = 'grab';
        renderer.domElement.addEventListener('pointerdown', onPointerDown);
        renderer.domElement.addEventListener('pointermove', onPointerMove);
        renderer.domElement.addEventListener('pointerup', onPointerUp);
        renderer.domElement.addEventListener('pointerleave', onPointerUp);

        // Animation loop (with cancellation)
        let animationId: number;
        const autoRotateSpeed = 0.003; // radians per frame (~0.17°/frame ≈ 10°/sec at 60fps)
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          if (model) {
            // Auto-rotate around Y axis when user isn't dragging
            if (!isDragging) {
              rotation.y += autoRotateSpeed;
            }
            model.rotation.x = rotation.x;
            model.rotation.y = rotation.y;
          }
          renderer.render(scene, camera);
        };
        animate();

        // Responsive resize
        const handleResize = () => {
          if (!container) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function — runs on unmount
        cleanup = () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener('resize', handleResize);
          renderer.domElement.removeEventListener('pointerdown', onPointerDown);
          renderer.domElement.removeEventListener('pointermove', onPointerMove);
          renderer.domElement.removeEventListener('pointerup', onPointerUp);
          renderer.domElement.removeEventListener('pointerleave', onPointerUp);
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        };
      } catch (err) {
        console.error('Failed to initialize 3D viewer:', err);
      }
    })();

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: '600px' }}
      />
      <p className="text-center text-sm text-gray-500 mt-2 absolute bottom-3 left-0 right-0 pointer-events-none">
        🖱️ Drag to rotate
      </p>
    </div>
  );
}
