import React, { Suspense } from "react";
import type { ErrorInfo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
} from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";
import CanvasLoader from "../layouts/loader";

// Error Boundary Component
class TextureErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Texture loading error (non-critical):', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Ball = (props: any) => {
  // Use TextureLoader with crossOrigin to fix CORS issues
  const decal = useLoader(TextureLoader, props.imgUrl, (loader) => {
    loader.setCrossOrigin('anonymous');
  }) as THREE.Texture;

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.35} groundColor="black" />
      <directionalLight
        castShadow
        position={[5, 5, 5]}
        intensity={1.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <mesh castShadow receiveShadow scale={2.75}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#fff8eb"
          roughness={0.3}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const SafeBallCanvas: React.FC<{ icon: string }> = ({ icon }) => {
  if (!icon) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
        No icon
      </div>
    );
  }

  return (
    <TextureErrorBoundary
      fallback={
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
          Error
        </div>
      }
    >
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enablePan={false} enableZoom={false} />
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </TextureErrorBoundary>
  );
};

export default SafeBallCanvas;
