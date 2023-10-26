import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <div id="canvas-container">
      <Canvas>
        <ambientLight intensity={0.001} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[20, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
