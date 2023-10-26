import { Canvas } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";


const App = () => {
  return (
    <div id="canvas-container" style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.001} />
        <pointLight color="white" position={[5, 7, 5]} decay={0}/>
        <ambientLight />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
