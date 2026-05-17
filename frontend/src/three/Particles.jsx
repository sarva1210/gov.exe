import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"

function ParticleSphere() {
  const meshRef = useRef()

  useFrame(() => {
    meshRef.current.rotation.y += 0.003
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3,32,32]} />
      <meshStandardMaterial color="cyan" wireframe/>
    </mesh>
  )
}

function Particles() {
  return (
    <div className="absolute inset-0 opacity-40">

      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[2,2,5]} />
        <ParticleSphere />
      </Canvas>

    </div>
  )
}

export default Particles