'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Text } from '@react-three/drei'
import * as THREE from 'three'

// Simple animated head component
function Head({ isSpeaking, mood = 'neutral' }: { isSpeaking: boolean; mood?: string }) {
  const headRef = useRef<THREE.Group>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (headRef.current) {
      // Gentle floating animation
      headRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      
      // Subtle head rotation
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
    
    if (mouthRef.current && isSpeaking) {
      // Mouth movement when speaking
      mouthRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.3
    }
  })

  const getMoodColor = () => {
    switch (mood) {
      case 'happy': return '#4ade80'
      case 'thinking': return '#fbbf24'
      case 'encouraging': return '#60a5fa'
      default: return '#60a5fa'
    }
  }

  return (
    <group ref={headRef}>
      {/* Head base */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#f8fafc" />
      </Sphere>
      
      {/* Face screen/display area */}
      <Sphere args={[0.85, 32, 32]} position={[0, 0, 0.15]}>
        <meshStandardMaterial color="#1e293b" />
      </Sphere>
      
      {/* Eyes */}
      <Sphere args={[0.12, 16, 16]} position={[-0.3, 0.15, 0.85]}>
        <meshStandardMaterial color={getMoodColor()} emissive={getMoodColor()} emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.12, 16, 16]} position={[0.3, 0.15, 0.85]}>
        <meshStandardMaterial color={getMoodColor()} emissive={getMoodColor()} emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Mouth */}
      <Box ref={mouthRef} args={[0.3, 0.08, 0.05]} position={[0, -0.25, 0.85]}>
        <meshStandardMaterial color={getMoodColor()} emissive={getMoodColor()} emissiveIntensity={0.3} />
      </Box>
      
      {/* Headphones/ears */}
      <Sphere args={[0.25, 16, 16]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="#475569" />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={[1, 0, 0]}>
        <meshStandardMaterial color="#475569" />
      </Sphere>
      
      {/* Neck */}
      <Box args={[0.4, 0.5, 0.3]} position={[0, -1.2, 0]}>
        <meshStandardMaterial color="#cbd5e1" />
      </Box>
    </group>
  )
}

// Floating particles effect
function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const particleCount = 50
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  // Create buffer geometry with positions
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial size={0.05} color="#60a5fa" transparent opacity={0.6} />
    </points>
  )
}

interface AIAvatarProps {
  isSpeaking?: boolean
  mood?: 'neutral' | 'happy' | 'thinking' | 'encouraging'
  size?: 'sm' | 'md' | 'lg'
}

export function AIAvatar({ isSpeaking = false, mood = 'neutral', size = 'md' }: AIAvatarProps) {
  const sizeClasses = {
    sm: 'h-32 w-32',
    md: 'h-48 w-48',
    lg: 'h-64 w-64'
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-b from-blue-900 to-slate-900`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
        
        <Head isSpeaking={isSpeaking} mood={mood} />
        <Particles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

// Simple avatar placeholder for when 3D isn't needed
export function AIAvatarPlaceholder({ mood = 'neutral', size = 'md' }: Omit<AIAvatarProps, 'isSpeaking'>) {
  const sizeClasses = {
    sm: 'h-32 w-32 text-4xl',
    md: 'h-48 w-48 text-6xl',
    lg: 'h-64 w-64 text-8xl'
  }

  const moodEmojis = {
    neutral: '🤖',
    happy: '😊',
    thinking: '🤔',
    encouraging: '⭐'
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-b from-blue-500 to-blue-700 flex items-center justify-center`}>
      <span className="animate-pulse">{moodEmojis[mood]}</span>
    </div>
  )
}
