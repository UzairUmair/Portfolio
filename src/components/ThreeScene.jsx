import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Floaty({ children, position = [0, 0, 0], speed = 1, intensity = 0.15 }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * intensity
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1
    group.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.08
  })

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  )
}

function LeafShape({ position, speed, color }) {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.3
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2
  })

  return (
    <Floaty position={position} speed={speed} intensity={0.12}>
      <mesh ref={mesh}>
        <torusGeometry args={[0.2, 0.06, 8, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Floaty>
  )
}

function FloatingObjects() {
  return (
    <group>
      {/* Organic sphere - like a seed */}
      <Floaty position={[2.2, 0.4, -1]} speed={0.8} intensity={0.15}>
        <mesh>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial
            color="#2d6b40"
            roughness={0.35}
            metalness={0.1}
            transparent
            opacity={0.55}
          />
        </mesh>
      </Floaty>

      {/* Gold accent ring */}
      <Floaty position={[2.6, -0.5, -0.8]} speed={1.2} intensity={0.1}>
        <mesh rotation={[0.5, 0.3, 0.2]}>
          <torusGeometry args={[0.18, 0.025, 12, 48]} />
          <meshStandardMaterial
            color="#d4a853"
            roughness={0.2}
            metalness={0.7}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Floaty>

      {/* Forest leaf ring */}
      <LeafShape position={[1.8, 1.0, -1.2]} speed={0.6} color="#3d8b55" />

      {/* Small charcoal cube */}
      <Floaty position={[2.8, 0.9, -1.5]} speed={1.0} intensity={0.08}>
        <mesh rotation={[0.6, 0.8, 0.2]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial
            color="#333333"
            roughness={0.5}
            metalness={0.3}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Floaty>

      {/* Cream colored octahedron */}
      <Floaty position={[1.5, -0.7, -0.9]} speed={0.9} intensity={0.12}>
        <mesh rotation={[0.3, 0.5, 0]}>
          <octahedronGeometry args={[0.14]} />
          <meshStandardMaterial
            color="#e5dcc8"
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Floaty>
    </group>
  )
}

function SubtleParticles() {
  const points = useRef()
  const positions = useMemo(() => {
    const count = 60
    const values = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 6
      values[i * 3 + 1] = (Math.random() - 0.5) * 4
      values[i * 3 + 2] = (Math.random() - 0.5) * 3
    }
    return values
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#2d6b40"
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.4}
      />
    </points>
  )
}

export default function ThreeScene() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-60 md:block">
      <Canvas className="h-full w-full" camera={{ position: [0, 0, 4], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 4]} intensity={1.2} color="#faf7f2" />
        <pointLight position={[-3, -2, 3]} intensity={0.6} color="#d4a853" />
        <SubtleParticles />
        <FloatingObjects />
      </Canvas>
    </div>
  )
}
