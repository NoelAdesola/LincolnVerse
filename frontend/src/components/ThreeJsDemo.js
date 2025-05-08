// src/components/ThreeJsDemo.js
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Box, Paper, Typography, CircularProgress, useTheme } from '@mui/material';
import * as THREE from 'three';

// Floating sphere with gentle bob & hover scale
function FloatingSphere({ position, color, size = 1, speed = 1 }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.2;
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.z = t * 0.1;
    const targetScale = hovered ? 1.2 : 1;
    mesh.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.4}
        envMapIntensity={1}
      />
    </mesh>
  );
}

// Spinning, color-changing 3D text
function InteractiveText({ text, position, rotation, onClick }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.005;
    ref.current.material.color.lerp(
      new THREE.Color(hovered ? '#ffb470' : '#5e8bff'),
      0.1
    );
  });

  return (
    <Text
      ref={ref}
      position={position}
      rotation={rotation}
      fontSize={0.5}
      color="#5e8bff"
      maxWidth={2}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="/fonts/Inter-Bold.woff"
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      {text}
    </Text>
  );
}

// The actual 3D scene
function Scene({ onItemClick }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#5ad4a6" intensity={0.5} />

      <FloatingSphere position={[-3, 0, 0]} color="#5e8bff" size={0.8} speed={0.7} />
      <FloatingSphere position={[3, 0, -2]} color="#5ad4a6" size={1.2} speed={0.5} />
      <FloatingSphere position={[0, 0, -5]} color="#ffb470" size={1.5} speed={0.3} />

      <InteractiveText
        text="Explore Images"
        position={[0, 2, 0]}
        rotation={[0, 0, 0]}
        onClick={() => onItemClick('images')}
      />
      <InteractiveText
        text="3D Models"
        position={[-2.5, 0.5, 0]}
        rotation={[0, 0.3, 0]}
        onClick={() => onItemClick('models')}
      />
      <InteractiveText
        text="Illustrations"
        position={[2.5, 0.5, 0]}
        rotation={[0, -0.3, 0]}
        onClick={() => onItemClick('illustrations')}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

// Main export
const ThreeJsDemo = ({ onItemSelect }) => {
  const theme = useTheme();

  const handleItemClick = type => {
    if (onItemSelect) onItemSelect(type);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 300, md: 500 },
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.shadows[4]
      }}
    >
      <Suspense
        fallback={
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: theme.palette.background.default
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Canvas camera={{ position: [0, 1, 6], fov: 60 }}>
          <Scene onItemClick={handleItemClick} />
        </Canvas>
      </Suspense>

      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          px: 2,
          py: 1,
          backdropFilter: 'blur(10px)',
          bgcolor: 'rgba(255,255,255,0.8)'
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Drag to rotate • Click text to explore
        </Typography>
      </Paper>
    </Box>
  );
};

export default ThreeJsDemo;
