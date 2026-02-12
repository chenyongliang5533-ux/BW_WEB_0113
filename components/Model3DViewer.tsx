// For your actual project, create a separate component for the 3D viewer
// components/Model3DViewer.tsx

"use client";

import { useEffect, useRef } from 'react';

export default function Model3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically load Three.js and GLTFLoader
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
    script2.async = true;

    script1.onload = () => {
      document.head.appendChild(script2);
    };

    script2.onload = () => {
      initScene();
    };

    document.head.appendChild(script1);

    function initScene() {
      const THREE = (window as any).THREE;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf9fafb);

      const camera = new THREE.PerspectiveCamera(
        45,
        containerRef.current!.clientWidth / containerRef.current!.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 5);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current!.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight1.position.set(5, 5, 5);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight2.position.set(-5, -5, -5);
      scene.add(directionalLight2);
	  
	  const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
	  topLight.position.set(0, 10, 0);
	  scene.add(topLight);
	  
	  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
	  scene.add(hemiLight);


      let model: any = null;

      // Load GLB model
      const loader = new (window as any).THREE.GLTFLoader();
      loader.load(
        '/models/BWR352.glb',
        (gltf: any) => {
          model = gltf.scene;
          
          // Center and scale
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
        (error: any) => {
          console.error('Error loading model:', error);
        }
      );

      // Mouse/Touch interaction
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      let rotation = { x: 0, y: 0 };

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        rotation.y += deltaX * 0.01;
        rotation.x += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onPointerUp = () => {
        isDragging = false;
      };

      renderer.domElement.addEventListener('pointerdown', onPointerDown);
      renderer.domElement.addEventListener('pointermove', onPointerMove);
      renderer.domElement.addEventListener('pointerup', onPointerUp);

      // Animation
      function animate() {
        requestAnimationFrame(animate);
        if (model) {
          model.rotation.x = rotation.x;
          model.rotation.y = rotation.y;
        }
        renderer.render(scene, camera);
      }
      animate();

      // Resize
      const handleResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);
    }

    return () => {
      // Cleanup
      if (containerRef.current && containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, []);

  return (
    <div>
      <div 
        ref={containerRef}
        className="bg-gray-50 rounded-3xl overflow-hidden"
        style={{ height: '500px', cursor: 'grab' }}
      />
      <p className="text-center text-sm text-gray-500 mt-4">
        🖱️ Drag to rotate • 📱 Touch & drag on mobile
      </p>
    </div>
  );
}