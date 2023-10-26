import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <div id="canvas-container">
      <Canvas>
        <boxGeometry />
        <meshStandardMaterial />
      </Canvas>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />)
