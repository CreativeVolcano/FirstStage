import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, AccumulativeShadows, RandomizedLight, Decal, Center, OrbitControls } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { Color } from 'three'
import { gsap } from 'gsap'

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
    <div style={{ height: '100vh' }}>
        <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
            <ambientLight intensity={0.5} />
            <directionalLight color={'white'} position={[10, 10, 10]} />
            <CameraRig>   
                <Center>
                    <Shirt />
                </Center>
            </CameraRig> 
        </Canvas>
    </div>
)

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={1.5} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 5, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

function Shirt(props) {
  const snap = useSnapshot(state)
  const ref = useRef();
  const texture = useTexture(`/${snap.decal}.png`)
//   useFrame((state, delta) => easing.dampC(ref.current && ref.current.color, snap.color, 0.25, delta))

useEffect(() => {
    const newColor = new Color(snap.color)
    console.log('ref.current.color:', ref.current && ref.current.color)
    console.log('snap.color:', newColor)
    gsap.to(ref.current.color, {
        duration: 1,
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
        ease: 'power2.out',
        overwrite: true,
    })
}, [snap.color])
  return (
    <mesh castShadow scale={0.4} {...props}>
        <boxGeometry />
        <meshStandardMaterial ref={ref} />
        <Decal position={[0, 0, 0.4]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.2]} map={texture} anisotropy={16}  />
    </mesh>
  )
}
