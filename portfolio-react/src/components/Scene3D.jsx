import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'

function Blob() {
  const mesh = useRef()
  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * 0.08
    mesh.current.rotation.y += delta * 0.12
  })
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={mesh} scale={1.7} position={[1.6, 0.2, 0]}>
        <icosahedronGeometry args={[1.3, 5]} />
        <MeshDistortMaterial color="#FF3D57" distort={0.42} speed={2} roughness={0.2} metalness={0.35} />
      </mesh>
    </Float>
  )
}

function Ring() {
  const ref = useRef()
  useFrame((_, delta) => { ref.current.rotation.z += delta * 0.06 })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.3, 0.3, 0]} position={[-1.8, -0.4, -1.5]}>
      <torusGeometry args={[2, 0.015, 16, 120]} />
      <meshBasicMaterial color="#00C2A8" transparent opacity={0.55} />
    </mesh>
  )
}

function Satellite() {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.position.x = Math.sin(t * 0.5) * 3
    ref.current.position.y = Math.cos(t * 0.4) * 1.4
  })
  return (
    <mesh ref={ref} position={[2.5, 1, -1]}>
      <octahedronGeometry args={[0.22, 0]} />
      <meshStandardMaterial color="#F4F4F1" roughness={0.3} />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-bg">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 3, 3]} intensity={1.1} />
        {/* <Blob /> */}
        <Ring />
        <Satellite />
        <Stars radius={45} depth={25} count={900} factor={2} fade speed={0.4} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.35}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}
