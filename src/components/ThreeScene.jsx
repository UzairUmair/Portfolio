import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function ParticleField() {
  const points = useRef()
  const positions = useMemo(() => {
    const count = 180
    const values = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 8
      values[i * 3 + 1] = (Math.random() - 0.5) * 5
      values[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return values
  }, [])

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.035
      points.current.rotation.x += delta * 0.012
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#22d3ee"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Floaty({ children, position = [0, 0, 0], speed = 1, intensity = 0.2 }) {
  const group = useRef()

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * intensity
    group.current.rotation.x += delta * 0.18
    group.current.rotation.y += delta * 0.22
  })

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  )
}

function FloatingObjects() {
  const group = useRef()

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.18
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08
  })

  return (
    <group ref={group}>
      <Floaty position={[2.45, 0.5, -0.9]} speed={1.35} intensity={0.1}>
        <mesh rotation={[0.6, 0.8, 0.2]}>
          <boxGeometry args={[0.38, 0.38, 0.38]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#0ea5e9"
            emissiveIntensity={0.45}
            roughness={0.28}
            metalness={0.65}
            wireframe
          />
        </mesh>
      </Floaty>

      <Floaty position={[2.55, -0.72, -0.75]} speed={1.05} intensity={0.13}>
        <mesh>
          <sphereGeometry args={[0.24, 40, 40]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#3b82f6"
            emissiveIntensity={0.45}
            roughness={0.22}
            metalness={0.45}
            transparent
            opacity={0.42}
          />
        </mesh>
      </Floaty>

      <Floaty position={[2.15, 1.08, -0.95]} speed={1.65} intensity={0.08}>
        <mesh rotation={[0.9, 0.2, 0.45]}>
          <torusGeometry args={[0.26, 0.012, 12, 72]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#34d399"
            emissiveIntensity={0.8}
            roughness={0.15}
            metalness={0.7}
          />
        </mesh>
      </Floaty>
    </group>
  )
}

export default function ThreeScene() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-45 md:block">
      <Canvas className="h-full w-full" camera={{ position: [0, 0, 4], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.55} />
        <pointLight position={[3, 3, 4]} intensity={2.2} color="#22d3ee" />
        <pointLight position={[-4, -2, 3]} intensity={1.6} color="#8b5cf6" />
        <ParticleField />
        <FloatingObjects />
      </Canvas>
    </div>
  )
}
