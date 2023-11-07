import { Canvas } from "@react-three/fiber";
import {Box, OrbitControls, Plane, Sphere} from "@react-three/drei";


const App = () => {
  return (
    <div id="canvas-container" style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.001} />
        <pointLight color="white" position={[5, 7, 5]} decay={0}/>
        <ambientLight />
        <Box args={[10, 1, 1]} material-color="hotpink" />
        <Plane args={[2, 2]} />
        <Sphere>
          <meshStandardMaterial color="hotpink" />
        </Sphere>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
