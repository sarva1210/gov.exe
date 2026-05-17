import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"

function Cube() {
  const meshRef = useRef()

  useFrame(() => {
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2,2,2]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

function FloatingCube() {
  return (
    <div className="absolute inset-0 -z-10">

      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[2,2,5]} />
        <Cube />
      </Canvas>

    </div>
  )
}

export default FloatingCube